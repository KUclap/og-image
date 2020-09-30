import { readFileSync } from "fs";
import marked from "marked";
// import axios from 'axios'
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";
import { getColorHash } from "./kuclap.helper";
const twemoji = require("twemoji");
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const small_nong = readFileSync(
  `${__dirname}/../_assets/small-nong.svg`
).toString("base64");

const big_nong = readFileSync(`${__dirname}/../_assets/big-nong.svg`).toString(
  "base64"
);

const kuclap_logo = readFileSync(`${__dirname}/../_assets/kuclap.svg`).toString(
  "base64"
);

const bg = readFileSync(`${__dirname}/../_assets/confetti-bg.png`).toString(
  "base64"
);
const kanit_medium = readFileSync(
  `${__dirname}/../_fonts/Kanit-Medium.ttf`
).toString("base64");

const kanit_regular = readFileSync(
  `${__dirname}/../_fonts/Kanit-Regular.ttf`
).toString("base64");

// function

function getCssKUclap(classId: string) {
  // // let background = "white";
  // let foreground = "black";
  // // let radial = "lightgray";

  // if (theme === "dark") {
  //   // background = "black";
  //   foreground = "white";
  //   // radial = "dimgray";
  // }
  return `
      @font-face {
          font-family: 'Kanit-Medium';
          font-style:  normal;
          font-weight: normal;
          src: url(data:font/truetype;charset=utf-8;base64,${kanit_medium}) format('truetype');
      }

      @font-face {
          font-family: 'Kanit-Regular';
          font-style:  normal;
          font-weight: normal;
          src: url(data:font/truetype;charset=utf-8;base64,${kanit_regular}) format('truetype');
      }

      body {
          position: relative;
          font-family: 'Kanit-Regular';
          height: 100vh;
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          background: url(data:image/png;base64,${bg});
      }
    
      .review-card {
           width: 1742px;
           height: 806px;
           background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #FFFFFF;
           box-shadow: 4px 8px 30px rgba(0, 0, 0, 0.1);
           border-radius: 16px;
           display: flex;
           justify-content: flex-start;
           position: relative;
      }

      .review-content {
          font-family: 'Kanit-Regular';
          display: block;
          display: -webkit-box;
          line-height: 1.8;   
          margin: 100px;
          font-weight: 400;
          font-size: 60px;
          color: #4F4F4F;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: left;
          width: 100%;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          height: 430px;
      }

      .subject {
          font-family: 'Kanit-Medium';
				  height: 104px;
      	  font-size: 64px;
					padding: 2px 52px;
					margin: 0 0 51px 78px;
					border-radius: 10px;
					text-align: center;
					color: white;
					position: absolute;
					transform: translateY(-52px);
					font-weight: 500;
					text-overflow: ellipsis;
					background: ${getColorHash(classId)};
					overflow: hidden;
					max-width: 79%;
					white-space: nowrap;
					filter: brightness(100%);
					
					span {
								font-weight: 400;
								margin-left: 2px;
					}
      }

      .kuclap-logo {
          position: absolute;
          margin: auto;
          bottom: 32px;
          width: 414px;
          height: 120px;
      }

      .small-nong {
          position: absolute;
          bottom: 0;
          left: 100px;
       }

      .big-nong {
          position: absolute;
          bottom: 0;
          right: 15px;
          transform: rotate(3.09deg);
      }
      `;
}

export function getHtml(parsedReq: ParsedRequest) {
  //   const { text, theme, md, fontSize, images, widths, heights } = parsedReq;
  const { text, md, classId, classNameTH } = parsedReq;

  const template = `<!DOCTYPE html>
  <html>
      <meta charset="utf-8">
      <title>Generated Image</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			
      <style>
          ${getCssKUclap(classId)}
      </style>
      <body>
					<div class="review-card">
						<div class="subject">
							${classId} <span> | ${classNameTH} </span>
						</div>
						
            <div class="review-content">${emojify(
              md ? marked(text) : sanitizeHtml(text)
            )}
            </div>
          </div>
          <img class="kuclap-logo" src="data:image/svg+xml;base64,${kuclap_logo}" />
          
          <img class="small-nong" src="data:image/svg+xml;base64,${small_nong}" />
          <img class="big-nong" src="data:image/svg+xml;base64,${big_nong}" />
          
      </body>
  </html>`;

  return template;
}

// function getImage(src: string, width = "auto", height = "225") {
//   return `<img
//         class="logo"
//         alt="Generated Image"
//         src="${sanitizeHtml(src)}"
//         width="${sanitizeHtml(width)}"
//         height="${sanitizeHtml(height)}"
//     />`;
// }

// function getPlusSign(i: number) {
//   return i === 0 ? "" : '<div class="plus">+</div>';
// }
