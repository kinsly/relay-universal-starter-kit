import Index from "./pages/index.js"
import HomePage from "./pages/home.js"

//Pages
import SamplePage from "./pages/mainPages/sample.page.js"
  import SampleSub1 from "./pages/subPages/sample/sub1.page.js"
  import SampleSub2 from "./pages/subPages/sample/sub2.page.js"

const ViewerQueries = {
  viewer: () => Relay.QL`query { travelerEntry(locale: $language) }`
}


export default [
    {
        path: '/',
        component: Index,
        queries: ViewerQueries,
        indexRoute: {
            component: HomePage,
            queries: ViewerQueries,
            prepareParams: () => ({language: null}),
        },
        childRoutes: [
          {
            path: "/:language",
            component: HomePage,
            queries: ViewerQueries,
            prepareParams: prepareParams
          },
          {
            path: "/:language/sample/list",
            component: SamplePage,
            queries: ViewerQueries,
            indexRoute: {
                component: SampleSub1,
                queries: ViewerQueries,
                prepareParams: prepareParams
            },
            childRoutes:[
              {
                path: "/:language/sample/edit",
                component: SampleSub2,
                queries: ViewerQueries,
                prepareParams: prepareParams
              },
            ]
          },
        ],
    },
];


function prepareParams(params) {
  if(params.language == "en" || params.language == "ja"){
    return {
      ...params
    };
  }else{
    let tmpParam = params;
    tmpParam.language = "en"
    //When component mounted if url if not in intended format redirect user to home page
    if(typeof(window)!=="undefined"){
        window.location = "/en"
    }
    //If url params are incorrect set to default value inorder generate page from server side
    return{
      ...tmpParam
    }
  }
};
