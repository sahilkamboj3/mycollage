module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/collages/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/collages/index.tsx":
/*!**********************************!*\
  !*** ./pages/collages/index.tsx ***!
  \**********************************/
/*! exports provided: getInitialProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getInitialProps\", function() { return getInitialProps; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n\nvar _jsxFileName = \"/Users/sahilkamboj/Desktop/Coding/Github/Web_Dev/mycollage2/frontend/pages/collages/index.tsx\";\n\n//import axios from \"axios\";\n//import { getCookieValue } from \"../util/logic\";\n//import { CollageInterface } from \"../interfaces\";\nconst Collages = ({\n  collages\n}) => {\n  //  const userUUID = getCookieValue(\"userUUID\");\n  //  console.log(userUUID);\n  //  console.log(typeof userUUID);\n  //\n  //  console.log(collages);\n  //  useEffect(() => {\n  //    fetch(\"http://localhost:5000/accounts/retrieveUUID\", {\n  //      credentials: \"include\",\n  //      headers: {\n  //        \"Content-Type\": \"application/json\",\n  //      },\n  //    })\n  //      .then((res) => res.json())\n  //      .then((data) => console.log(data));\n  //  }, []);\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: \"Your Collages\"\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 23,\n    columnNumber: 10\n  }, undefined);\n}; //export async function getStaticProps() {\n//  //  const userUUID = getCookieValue(\"userUUID\");\n//  //  console.log(userUUID);\n//\n//  //  const res = await fetch(`http://localhost:8080/collage/getAll/${userUUID}`);\n//  //  const collages = await res.json();\n//\n//  fetch(\"http://localhost:5000/accounts/retrieveUUID\", {\n//    credentials: \"include\",\n//    headers: {\n//      \"Content-Type\": \"application/json\",\n//    },\n//  })\n//    .then((res) => res.json())\n//    .then((data) => console.log(data));\n//\n//  const collages = [\"hi\", \"bye\"];\n//  return {\n//    props: {\n//      collages,\n//    },\n//  };\n//}\n\n\nasync function getInitialProps() {\n  //  const userUUID = getCookieValue(\"userUUID\");\n  //  console.log(userUUID);\n  //  const res = await fetch(`http://localhost:8080/collage/getAll/${userUUID}`);\n  //  const collages = await res.json();\n  fetch(\"http://localhost:5000/accounts/retrieveUUID\", {\n    credentials: \"include\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    }\n  }).then(res => res.json()).then(data => console.log(data));\n  const collages = [\"hi\", \"bye\"];\n  return {\n    props: {\n      collages\n    }\n  };\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (Collages);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9jb2xsYWdlcy9pbmRleC50c3g/ZmY1YSJdLCJuYW1lcyI6WyJDb2xsYWdlcyIsImNvbGxhZ2VzIiwiZ2V0SW5pdGlhbFByb3BzIiwiZmV0Y2giLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJ0aGVuIiwicmVzIiwianNvbiIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwicHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFHQSxNQUFNQSxRQUFRLEdBQUcsQ0FBQztBQUFFQztBQUFGLENBQUQsS0FBa0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsc0JBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBUDtBQUNELENBbEJELEMsQ0FvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRU8sZUFBZUMsZUFBZixHQUFpQztBQUN0QztBQUNBO0FBRUE7QUFDQTtBQUVBQyxPQUFLLENBQUMsNkNBQUQsRUFBZ0Q7QUFDbkRDLGVBQVcsRUFBRSxTQURzQztBQUVuREMsV0FBTyxFQUFFO0FBQ1Asc0JBQWdCO0FBRFQ7QUFGMEMsR0FBaEQsQ0FBTCxDQU1HQyxJQU5ILENBTVNDLEdBQUQsSUFBU0EsR0FBRyxDQUFDQyxJQUFKLEVBTmpCLEVBT0dGLElBUEgsQ0FPU0csSUFBRCxJQUFVQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsSUFBWixDQVBsQjtBQVNBLFFBQU1SLFFBQVEsR0FBRyxDQUFDLElBQUQsRUFBTyxLQUFQLENBQWpCO0FBQ0EsU0FBTztBQUNMVyxTQUFLLEVBQUU7QUFDTFg7QUFESztBQURGLEdBQVA7QUFLRDtBQUVjRCx1RUFBZiIsImZpbGUiOiIuL3BhZ2VzL2NvbGxhZ2VzL2luZGV4LnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuLy9pbXBvcnQgeyBnZXRDb29raWVWYWx1ZSB9IGZyb20gXCIuLi91dGlsL2xvZ2ljXCI7XG4vL2ltcG9ydCB7IENvbGxhZ2VJbnRlcmZhY2UgfSBmcm9tIFwiLi4vaW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5cbmNvbnN0IENvbGxhZ2VzID0gKHsgY29sbGFnZXMgfSkgPT4ge1xuICAvLyAgY29uc3QgdXNlclVVSUQgPSBnZXRDb29raWVWYWx1ZShcInVzZXJVVUlEXCIpO1xuICAvLyAgY29uc29sZS5sb2codXNlclVVSUQpO1xuICAvLyAgY29uc29sZS5sb2codHlwZW9mIHVzZXJVVUlEKTtcbiAgLy9cbiAgLy8gIGNvbnNvbGUubG9nKGNvbGxhZ2VzKTtcbiAgLy8gIHVzZUVmZmVjdCgoKSA9PiB7XG4gIC8vICAgIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo1MDAwL2FjY291bnRzL3JldHJpZXZlVVVJRFwiLCB7XG4gIC8vICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxuICAvLyAgICAgIGhlYWRlcnM6IHtcbiAgLy8gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAvLyAgICAgIH0sXG4gIC8vICAgIH0pXG4gIC8vICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgLy8gICAgICAudGhlbigoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YSkpO1xuICAvLyAgfSwgW10pO1xuXG4gIHJldHVybiA8ZGl2PllvdXIgQ29sbGFnZXM8L2Rpdj47XG59O1xuXG4vL2V4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdGF0aWNQcm9wcygpIHtcbi8vICAvLyAgY29uc3QgdXNlclVVSUQgPSBnZXRDb29raWVWYWx1ZShcInVzZXJVVUlEXCIpO1xuLy8gIC8vICBjb25zb2xlLmxvZyh1c2VyVVVJRCk7XG4vL1xuLy8gIC8vICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDgwL2NvbGxhZ2UvZ2V0QWxsLyR7dXNlclVVSUR9YCk7XG4vLyAgLy8gIGNvbnN0IGNvbGxhZ2VzID0gYXdhaXQgcmVzLmpzb24oKTtcbi8vXG4vLyAgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjUwMDAvYWNjb3VudHMvcmV0cmlldmVVVUlEXCIsIHtcbi8vICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcbi8vICAgIGhlYWRlcnM6IHtcbi8vICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4vLyAgICB9LFxuLy8gIH0pXG4vLyAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxuLy8gICAgLnRoZW4oKGRhdGEpID0+IGNvbnNvbGUubG9nKGRhdGEpKTtcbi8vXG4vLyAgY29uc3QgY29sbGFnZXMgPSBbXCJoaVwiLCBcImJ5ZVwiXTtcbi8vICByZXR1cm4ge1xuLy8gICAgcHJvcHM6IHtcbi8vICAgICAgY29sbGFnZXMsXG4vLyAgICB9LFxuLy8gIH07XG4vL31cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEluaXRpYWxQcm9wcygpIHtcbiAgLy8gIGNvbnN0IHVzZXJVVUlEID0gZ2V0Q29va2llVmFsdWUoXCJ1c2VyVVVJRFwiKTtcbiAgLy8gIGNvbnNvbGUubG9nKHVzZXJVVUlEKTtcblxuICAvLyAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9jb2xsYWdlL2dldEFsbC8ke3VzZXJVVUlEfWApO1xuICAvLyAgY29uc3QgY29sbGFnZXMgPSBhd2FpdCByZXMuanNvbigpO1xuXG4gIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo1MDAwL2FjY291bnRzL3JldHJpZXZlVVVJRFwiLCB7XG4gICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIH0sXG4gIH0pXG4gICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAudGhlbigoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YSkpO1xuXG4gIGNvbnN0IGNvbGxhZ2VzID0gW1wiaGlcIiwgXCJieWVcIl07XG4gIHJldHVybiB7XG4gICAgcHJvcHM6IHtcbiAgICAgIGNvbGxhZ2VzLFxuICAgIH0sXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbGxhZ2VzO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/collages/index.tsx\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react/jsx-dev-runtime\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIj9jZDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0L2pzeC1kZXYtcnVudGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react/jsx-dev-runtime\n");

/***/ })

/******/ });