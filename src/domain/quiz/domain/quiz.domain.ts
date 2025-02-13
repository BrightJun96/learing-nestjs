import { Field } from "../../../shared/enum/field.enum";
import { MultipleChoiceDomain } from "./multiple-choice.domain";
import { QuizMetaDataDomain } from "./quiz-meta-data.domain";

export class QuizDomain {
  id: number;
  title: string;
  content: string;
  detailUrl: string;
  field: Field;
  explanation: string;
  answer: number;
  quizMetaData: QuizMetaDataDomain;
  multipleChoices: MultipleChoiceDomain[];
  createdAt: Date;
  updatedAt: Date;
  version: number;

  constructor({
    id,
    title,
    content,
    detailUrl,
    field,
    explanation,
    answer,
    quizMetaData,
    createdAt,
    updatedAt,
    version,
  }: {
    id: number;
    title: string;
    content: string;
    detailUrl: string;
    field: Field;
    explanation: string;
    answer: number;
    quizMetaData: QuizMetaDataDomain;
    createdAt: Date;
    updatedAt: Date;
    version: number;
  }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.detailUrl = detailUrl;
    this.field = field;
    this.explanation = explanation;
    this.answer = answer;
    this.quizMetaData = quizMetaData;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.version = version;
  }

  assignMultipleChoices(
    multipleChoices: MultipleChoiceDomain[],
  ) {
    this.multipleChoices = multipleChoices;
  }
}
