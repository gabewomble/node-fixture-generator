import RequestFactory from './lib/request';
import WriterClass from './lib/write';

import type { FactoryConfig } from './lib/request';

type GeneratorConfig = {
  requestConfig: Array<FactoryConfig> | FactoryConfig;
  outDir?: string;
}

const fixtureGenerator = ({
  requestConfig,
  outDir,
}: GeneratorConfig): void => {
  if (Array.isArray(requestConfig)) {
    requestConfig.forEach((configChild) => {
      fixtureGenerator({
        requestConfig: configChild,
        outDir,
      });
    });
  } else if (requestConfig && typeof requestConfig === 'object') {
    const Factory = new RequestFactory(requestConfig);
    const Writer = new WriterClass(outDir);

    return Factory.compileRequests((val) => Writer.write(val), console.error);
  }

  throw new Error('invalid config provided');
};

export default fixtureGenerator;
