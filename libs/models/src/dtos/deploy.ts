
export interface IDeployDto {
  projectId: string;
}

export type IDeployMessageType = "status" | "phase" | "text" | "progress";

export type IDeployMessageStatus = "started" | "finished";

export const deployStatusText: Record<IDeployMessageStatus, string> = {
  "started": "Started",
  "finished": "Finished",
}

export type IDeployMessagePhase =
  "pulling-helm-repo"
  | "pulling-project-repo"
  | "cleaning-up";

export const deployPhaseTitles: Record<IDeployMessagePhase, string> = {
  "pulling-helm-repo": "Pulling Helm repository",
  "pulling-project-repo": "Pulling project repository",
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

  progress: (phase: string, progress: number, replaceLast: boolean = false) => ({
    replaceLast,
    type: "progress",
    progressMessage: {
      phase,
      progress
    }
  }),
} satisfies Record<IDeployMessageType, (...args: any[]) => IDeployMessageDto>
