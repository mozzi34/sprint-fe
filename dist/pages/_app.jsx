"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
require("../styles/globals.css");
const react_query_1 = require("@tanstack/react-query");
const react_query_devtools_1 = require("@tanstack/react-query-devtools");
const react_hot_toast_1 = require("react-hot-toast");
const Navbar_1 = __importDefault(require("../components/Navbar"));
const Footer_1 = __importDefault(require("../components/Footer"));
const UserContextProvider_1 = require("../context/UserContextProvider");
function App({ Component, pageProps, }) {
    const queryClient = new react_query_1.QueryClient();
    return (<>
      <react_query_1.QueryClientProvider client={queryClient}>
        <UserContextProvider_1.UserContextProvider>
          <Navbar_1.default />
          <Component {...pageProps}/>
          <Footer_1.default />
          <react_hot_toast_1.Toaster />
          <react_query_devtools_1.ReactQueryDevtools initialIsOpen={false}/>
        </UserContextProvider_1.UserContextProvider>
      </react_query_1.QueryClientProvider>
    </>);
}
