import { SwaggerOptions } from "swagger-ui-express";

const swaggerOptions: SwaggerOptions = {
  customSiteTitle: "Recipes app API",
  customfavIcon:
    "https://res.cloudinary.com/dvloxectq/image/upload/v1707588493/recipes/favicon_qm9fkd.ico",
  customJs: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
  ],
  customCssUrl: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css",
  ],
};

export default swaggerOptions;
