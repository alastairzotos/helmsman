
export interface IDeployDto {
  projectId: string;
}

export type IDeployMessageType = "phase" | "git";

export type IDeployMessagePhase =
  "pulling-helm-repo"
  | "pulling-project-repo"
  | "cleaning-up"
  | "finished";

export const deployPhaseTitles: Record<IDeployMessagePhase, string> = {
  "pulling-helm-repo": "Pulling Helm repository",
  "pulling-project-repo": "Pulling Project repository",
  "cleaning-up": "Cleaning up",
  "finished": "Finished",
}

export interface IDeployMessageGitDto {
  phase: string;
  progress?: number;
}

export interface IDeployMessageDto {
  type: IDeployMessageType;
  phase?: IDeployMessagePhase;
  gitMessage?: IDeployMessageGitDto;
}

export const deployMessage = {
  phase: (phase: IDeployMessagePhase) => ({
    type: 'phase',
    phase,
  }),

  git: (phase: string, progress?: number) => ({
    type: 'git',
    gitMessage: {
      phase,
      progress
    }
  }),
} satisfies Record<IDeployMessageType, (...args: any[]) => IDeployMessageDto>
