import { render as renderMustache } from "mustache";
import mjml2html from "mjml-web";
import moment from "moment";

const template = (async () => {
  const response = await fetch("email-template.mjml");
  if (response.ok) {
    console.log("retrieved the template file");
  } else {
    console.error("ups, did not retrieve");
  }

  return response.text();
})();

async function generateHTML(data) {
  const t = await template;

  const mjml = renderMustache(t, data);

  const { html } = mjml2html(mjml);

  return html;
}

function imageToDataURL(imageUrl) {
  return new Promise((resolution, rejection) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          resolution(reader.result);
        };
      })
      .catch((err) => rejection(`failed to retrieve image: ${err}`));
  });
}

export async function generateEmail(data) {
  const { photo, date, ...rest } = data;

  return generateHTML({
    photo: await imageToDataURL(URL.createObjectURL(photo)),
    date: moment(date).format("DD/MM/YYYY"),
    eveeImg: await imageToDataURL("evee-img.jpg"),
    ...rest,
  });
}

export async function generatePreview(data) {
  const { photo, date, ...rest } = data;

  return generateHTML({
    photo: photo ? URL.createObjectURL(photo) : "",
    date: date ? moment(date).format("DD/MM/YYYY") : "",
    eveeImg: "evee-img.jpg",
    ...rest,
  });
}
