import type { QuizType } from 'types';
import Modal from 'components/Modal';

type Props = {
  close: () => void;
  data: QuizType;
};

const EditorQuizViewer = ({ close, data: { name, quiz } }: Props) => {
  return (
    <Modal title={name} close={close}>
      <div className="flex flex-col h-full pb-4">
        {quiz.map(({ name, options }, i) => {
          return (
            <div className="mb-4">
              <div>
                {i + 1}. {name}
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
