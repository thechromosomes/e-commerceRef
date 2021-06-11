export default (context, inject) => {
  try {
    const globalError = function (error) {
      let base = context.store.state.BASE_URL;
      console.log('error >>>', error)
      // context.$axios({
      //   url: `${base}/generateerrorlog`,
      //   method: "post",
      //   params: { error },
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
    };
    inject("globalError", globalError);
  } catch (error) {
    console.log("error from the global error >>>", error);
  }
};












