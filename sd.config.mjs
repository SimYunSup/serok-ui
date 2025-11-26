import StyleDictionary from 'style-dictionary';
import { hexToOklch } from './app/lib/utils/colorUtils.ts';

/**
 * 변수명 설정
 * 형식: serok-<path-joined>
 */
StyleDictionary.registerTransform({
  name: 'name/serok-kebab',
  type: 'name',
  transform: prop => `serok-${prop.path.join('-')}`,
});

/**
 * hex를 oklch로 변환
 */
StyleDictionary.registerTransform({
  name: 'color/oklch',
  type: 'value',
  transitive: true,
  filter: prop => prop.type === 'color',
  transform: (prop) => {
    try {
      return hexToOklch(prop.value);
    }
    catch (_) {
      return prop.value;
    }
  },
});

/**
 * color layer 출력
 * 형식: @layer serok { :root { ... } }
 */
StyleDictionary.registerFormat({
  name: 'css/color-variables',
  format: ({ dictionary }) => {
    const body = dictionary.allTokens
      .map(p => `    --${p.name}: ${p.value};`)
      .join('\n');

    return ['/* registry:ui */', '@layer serok {', '  :root {', body, '  }', '}', ''].join('\n');
  },
});

export default {
  source: ['tokens/colors.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['name/serok-kebab', 'color/oklch'],
      buildPath: 'lib/ui/Provider/',
      files: [
        {
          destination: 'colors.css',
          format: 'css/color-variables',
        },
      ],
    },
  },
};
