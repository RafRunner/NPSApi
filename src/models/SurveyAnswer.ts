import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity("surveys_answers")
class SurveyAnswer {
	@PrimaryColumn()
	readonly id: string;

	@Column()
	user_id: string;

	@Column()
	survey_id: string;

	@Column()
	value: number

	@CreateDateColumn()
	created_at: Date;

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { SurveyAnswer };