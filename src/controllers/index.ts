import type { IRootActionInput } from '~src/types';

const rootAction = async (options: IRootActionInput) => {
  console.log(JSON.stringify(options));
};

export { rootAction };
