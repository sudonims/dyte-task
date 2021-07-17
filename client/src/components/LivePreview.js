import React from 'react';
import FileContext from './FilesContext';
import { Container } from '@material-ui/core';
// import $ from 'jquery';

const getGeneratedPageURL = ({ html, css, js }) => {
  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type });
    return URL.createObjectURL(blob);
  };

  const cssURL = getBlobURL(css, 'text/css');
  const jsURL = getBlobURL(js, 'text/javascript');

  const source = `
    <html>
      <head>
        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
			</head>
			<body>
      	${html || ''}
      	${js && `<script src="${jsURL}"></script>`}
      </body>
    </html>
  `;

  return getBlobURL(source, 'text/html');
};

export default function LivePreview() {
  const { files } = React.useContext(FileContext);

  React.useEffect(() => {
    const url = getGeneratedPageURL({
      html: files[0].data,
      css: files[1].data,
      js: files[2].data,
    });

    var frame = document.getElementById('live');
    frame.src = url;

    // var frame = $('iframe');
    // var contents = frame.contents();
    // var body = contents.find('body');
    // var head = contents.find('head');
    // head.empty();
    // var style = head.append('<style></style>').children('style');
    // style.text(files[1].data);

    // body.empty();
    // body.html(files[0].data);
    // var script = body.append('<script></script>').children('script');
    // script.attr('type', 'text/javascript');
    // // script.html(files[2].data);
    // var script_ = new Blob([files[2].data], { type: '/text/javascript' });
    // var scriptSrc = URL.createObjectURL(script_);
    // script.attr('src', scriptSrc);
  }, [files]);

  return (
    <Container>
      <iframe title="live-preview" id="live"></iframe>
    </Container>
  );
}
