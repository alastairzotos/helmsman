export type IDeployMessageType = "status" | "phase" | "text" | "array" | "progress";

export type IDeployMessageStatus = "started" | "finished" | "error";

export type IDeployMessagePhase =
  "getting-tag"
  | "pulling-helm-repo"
  | "deploying"
  | "cleaning-up";

export const deployPhaseTitles: Record<IDeployMessagePhase, string> = {
  "getting-tag": "Getting last project tag",
  "pulling-helm-repo": "Pulling Helm repository",
  "deploying": "Deploying",
  "cleaning-up": "Cleaning up",
}

export interface IDeployMessageProgressDto {
  phase: string;
  progress?: number;
}

export interface IDeployMessageDto {
  replaceLast?: boolean;
  type: IDeployMessageType;
  status?: IDeployMessageStatus;
  phase?: IDeployMessagePhase;
  progressMessage?: IDeployMessageProgressDto;
  textMessage?: string;
  arrayMessage?: string[];
}

export const deployMessage = {
  status: (status: IDeployMessageStatus) => ({
    type: "status",
    status,
  }),

  phase: (phase: IDeployMessagePhase) => ({
    type: 'phase',
    phase,
  }),

  text: (textMessage: string, replaceLast: boolean = false) => ({
    replaceLast,
    type: "text",
    textMessage,
  }),

  array: (arrayMessage: string[], replaceLast: boolean = false) => ({
    replaceLast,
    type: "array",
    arrayMessage,
  }),

  progress: (phase: string, progress: number, replaceLast: boolean = false) => ({
    replaceLast,
    type: "progress",
    progressMessage: {
      phase,
      progress
    }
  }),
} satisfies Record<IDeployMessageType, (...args: any[]) => IDeployMessageDto>
