import { PersonAddress } from './PersonAddress';
import { Contact } from './Contact';


export class Person {

    personCPR:number;

	/** The person arabic name. */
	personArabicName:string;

	/** The person english name. */
    personEnglishName:string;

	/** The birth date. */
	birthDate:Date;

	/** The date of death. */
	dateOfDeath:Date;

	/** The is bahraini. */
	isBahraini:boolean;

	/** The is alive. */
	isAlive:boolean;

	/** The person address. */
	personAddress:PersonAddress

	/** The cpr. */
	cpr:number;

	// Extra Information

	/** The gender. */
	gender:number;

	/** The age. */
	age:number;

	/** The nationality. */
	nationality:string;

	/** The marital status. */
	maritalStatus:string;

	/** The marital status code. */
	maritalStatusCode:string;

	/** The educational level. */
    educationalLevel:string;

	/** The employer. */
	employer:string;

	/** The occupation. */
    occupation:string;

	/** The salary. */
	salary:number;

	
	/** The gender string. */
    genderString:string;

	/** The education level arabic name. */
	educationLevelArabicName:string;

	/** The labor participation arabic name. */
	laborParticipationArabicName:string;

	rejectionReasons:string[];

	mobile2:string;
	mobile1SMS:string;
	contact?:Contact;
}
