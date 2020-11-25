import React, { useState } from "react";

import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, useStyletron, DarkTheme } from "baseui";

import JoinerForm from "./JoinerForm";
import { H1, ParagraphMedium } from "baseui/typography";
import { Grid, Responsive, Cell, BEHAVIOR } from "baseui/layout-grid";

import { Drawer, SIZE } from "baseui/drawer";

const engine = new Styletron();

function LeftPane({ onPreview, onSubmit }) {
  const [css, theme] = useStyletron();

  return (
    <div
      className={css({
        backgroundColor: theme.colors.background,
        padding: theme.sizing.scale1000,
        ...theme.borders.border600,
      })}
    >
      <header>
        <H1>New Joiners Welcome Email</H1>
        <ParagraphMedium>
          Create a new uploading Email for the new welcomers
        </ParagraphMedium>
      </header>

      <JoinerForm onSubmit={onSubmit} onPreview={onPreview}></JoinerForm>
    </div>
  );
}

export function PreviewDrawer({ isOpen, onClose, htmlContent }) {
  return (
    <Drawer isOpen={isOpen} size={SIZE.auto} onClose={onClose}>
      <div
        style={{
          width: "720px",
          height: "100%",
          padding: "3m",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <iframe
          srcDoc={htmlContent}
          style={{
            width: "98%",
            height: "98%",
            padding: 0,
            margin: 0,
          }}
        ></iframe>
      </div>
    </Drawer>
  );
}

export default function App() {
  const [preview, setPreview] = useState(null);

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Grid behavior={BEHAVIOR.fluid}>
          <Cell span={6}>
            <LeftPane
              onPreview={(data) => setPreview(JSON.stringify(data))}
              onSubmit={(data) => console.log(data)}
            ></LeftPane>
          </Cell>
        </Grid>
        <PreviewDrawer
          isOpen={preview !== null}
          onClose={() => setPreview(null)}
          htmlContent={preview}
        />
      </BaseProvider>
    </StyletronProvider>
  );
}
