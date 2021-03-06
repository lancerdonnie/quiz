import type { QuizType } from 'types';
import Modal from 'components/Modal/Modal';

type Props = {
  open: boolean;
  close: () => void;
  data: QuizType;
};

const EditorQuizViewer = ({ open, close, data: { name, quiz } }: Props) => {
  return (
    <Modal open={open} title={name} close={close}>
      <div className="flex flex-col h-full pb-4">
        {quiz.map(({ question, options }, i) => {
          return (
            <div className="mb-4">
              <div>
                {i + 1}. {question}
              </div>
              <div>
                {options.map(({ value, answer }) => {
                  return (
                    <div className="ml-4" key={value}>
                      <span className="mr-2 h-2 w-2 bg-black inline-block rounded-full"></span>
                      <span className={`${answer && 'text-green-400'}`}>{value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default EditorQuizViewer;
