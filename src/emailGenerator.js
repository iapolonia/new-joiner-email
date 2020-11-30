import { render as renderMustache } from "mustache";
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

  const username = "9483e646-5c32-4e89-bf32-66155a1f88eb";
  const password = "719008c1-e69b-4e2d-b897-6a8aeb849d98";

  const response = await fetch("https://api.mjml.io/v1/render", {
    method: "POST",
    headers: (() => {
      const headers = new Headers();
      headers.set("Authorization", "Basic " + btoa(username + ":" + password));
      headers.set("Content-Type", "application/json");
      return headers;
    })(),
    body: JSON.stringify({ mjml }),
  });

  const { html } = await response.json();

  return html;
}

export async function generateEmail(data) {
  const { photo, date, ...rest } = data;

  return generateHTML({
    date: moment(date).format("DD/MM/YYYY"),
    eveeImg: "evee-img.jpg",
    ...rest,
  });
}

export async function generatePreview(data) {
  const { photo, date, ...rest } = data;

  return generateHTML({
    date: date ? moment(date).format("DD/MM/YYYY") : "",
    eveeImg: "evee-img.jpg",
    ...rest,
  });
}
