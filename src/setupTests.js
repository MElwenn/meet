// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
//import '@testing-library/jest-dom';

import "@testing-library/jest-dom/extend-expect";
import { configure } from 'enzyme';
//import Adapter from 'enzyme-adapter-react-16';
// Importing @wojtekmaj/enzyme-adapter-react-17 because no official enzyme adapter for REACT v17
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });