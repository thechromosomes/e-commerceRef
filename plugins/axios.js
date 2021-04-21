export default function ({ $axios, redirect, $globalError }) {
  let configUrl;
  $axios.onRequest((config) => {
    configUrl = config.url;
  });

  $axios.onError((error) => {
    $globalError(`${error} from ${configUrl}`);
    const code = parseInt(error.response && error.response.status);
    if (code === 400) {
      redirect("/404");
    }
  });
}
