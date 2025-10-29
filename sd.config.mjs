import StyleDictionary from "style-dictionary";

/**
 * 변수명 설정
 * 형식: serok-<path-joined>
 */
StyleDictionary.registerTransform({
  name: "name/serok-kebab",
  type: "name",
  transform: (prop) => `serok-${prop.path.join("-")}`,
});

/**
 * color layer 출력
 * 형식: @layer serok { :root { ... } }
 */
StyleDictionary.registerFormat({
  name: "css/color-variables",
  format: ({ dictionary }) => {
    const body = dictionary.allTokens
      .map((p) => `    --${p.name}: ${p.value};`)
      .join("\n");

    return ["@layer serok {", "  :root {", body, "  }", "}", ""].join("\n");
  },
});

export default {
  source: ["tokens/colors.json"],
  platforms: {
    css: {
      transformGroup: "css",
      transforms: ["name/serok-kebab", "color/css"],
      buildPath: "lib/ui/Provider/",
      files: [
        {
          destination: "colors.css",
          format: "css/color-variables",
        },
      ],
    },
  },
};
