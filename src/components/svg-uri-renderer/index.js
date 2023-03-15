import * as React from 'react';
import {SvgUri} from 'react-native-svg';

export default function SVGURIRenderer({uri}) {
  return (
    <SvgUri
      //   onError={() =>
      //     setUri('https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/ruby.svg')
      //   }
      width="100%"
      height="100%"
      uri={uri}
    />
  );
}
