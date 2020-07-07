/** @jsx jsx */
import { css } from '@emotion/core';

const logoCss = css`
  color: white;
`;

const wrapper = css`
  margin: 0;
  padding: 0 24px 24px;
  height: 100%;
`;

const breadcrumbCss = css`
  margin: 16px 0;
`;
const textareaCss = css`
  width: 100%;
`;

// const contentLayout = css`
//   padding: 24px,
//   margin: 0,
//   min-height: 280,
//   background: #fff;
// `;

const questionTitle = css`
  background-color: #95bff2;
  padding: 8px 8px;
`;

const questionInput = css`
  background-color: #f2eee6;
  padding: 8px 8px;
  height: 50vh;
`;

const answerTitle = css`
  background-color: #f2a690;
  padding: 8px 8px;
`;

const answerInput = css`
  background-color: #f2decf;
  padding: 8px 8px;
  height: 50vh;
`;

const footerCss = css`
  text-align: center;
  background-color: #6c6564;
`;

const indexBtnWrapperCss = css`
  height: 100%;
`;
const indexBtnCss = css`
  width: 60%;
  &:hover {
    outline: none;
    border: 0.5px solid #95bff2;
  }
  &:focus {
    outline: none;
    border: 0.5px solid #95bff2;
  }
  text-align: center;
  padding: 0px;
`;

const indexBtnBoxCss = css`
  width: 40px;
  overflow: auto;
  text-align: center;
`;

const oneDomainCss = css`
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 18px;
`;
const sidebarEditBtnCss = css`
  border-radius: 5px;
  border: none;
  color: #999999;
  background-color: #f2eee6;
  margin-right: 1px;
  &:hover {
    color: #999999;
    background-color: #f18f6d;
  }
`;

const sidebarInputBtnCss = css`
  ${sidebarEditBtnCss}
  color: black;
`;
const sidebarInputCss = css`
  width: 50%;
  &:focus {
    outline: 0.5px solid #999;
    border: none;
  }
`;

const domainUl = css`
  list-style-type: disc;
`;

const sidebarSubdomainLiCss = css`
  margin-left: 30px;
  font-size: 16px;
  padding-top: 5px;
  padding-bottom: 5px;
  list-style-type: circle;
`;

const domainAddBtnCss = css`
  border: none;
  border-radius: 0px;
  color: white;
  background-color: #95bff2;
  &:hover {
    background-color: #5075af;
    color: white;
  }
`;

export {
  footerCss,
  answerInput,
  answerTitle,
  questionInput,
  questionTitle,
  textareaCss,
  breadcrumbCss,
  wrapper,
  logoCss,
  indexBtnBoxCss,
  indexBtnWrapperCss,
  indexBtnCss,
  sidebarInputCss,
  oneDomainCss,
  sidebarInputBtnCss,
  sidebarEditBtnCss,
  domainUl,
  sidebarSubdomainLiCss,
  domainAddBtnCss,
};
