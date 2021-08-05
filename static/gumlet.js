window.GUMLET_CONFIG = {
    hosts: [{
        current: "dibackend.dieselindia.com",
        gumlet: "diesel.gumlet.io"
    }],
    lazy_load: true
};
(function(){
    d=document;
    s=d.createElement("script");
    s.src="https://cdn.gumlet.com/gumlet.js/2.1/gumlet.min.js";
    s.async=1;
    d.getElementsByTagName("head")[0].appendChild(s);
})();