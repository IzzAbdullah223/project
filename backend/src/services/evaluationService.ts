import { prisma } from '../db/prisma.js';
import { evaluateFlag, type FlagStateInput } from '../evaluation/evaluator.js';
import { type  UserContext } from '../evaluation/rules.js';


export async function evaluateFlagForUser(flagKey:string,environmentId:string,user:UserContext){
    const flag = await prisma.flag.findFirst({
    where: { key: flagKey, project: { environments: { some: { id: environmentId } } } },
    include: {
      flagStates: {
        where: { environmentId },
      },
    },
  });

  if(!flag || flag.flagStates.length===0){
    return {flagKey, enabled:false, reason: "FLAG_NOT_FOUND" as const}
  }

  const flagState = flag.flagStates[0];

    if (!flagState) {
        return { flagKey, enabled: false, reason: 'FLAG_NOT_FOUND' as const };
    }

  const input: FlagStateInput = {
    enabled: flagState.enabled,
    rolloutPercent: flagState.rolloutPercent,
    rules: flagState.rules as any,
  };

  return evaluateFlag(flagKey, input, user);
}