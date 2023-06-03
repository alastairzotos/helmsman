interface Props {
  text: string;
}

export const DeployLogsText: React.FC<Props> = ({ text }) => {
  if (text.includes('\n')) {
    return (
      <>
        {text.split('\n').map((line, index) => (
          <div key={index}>
            <samp>{line}</samp>
          </div>
        ))}
      </>
    )
  }

  return <samp>{text}</samp>
}
