export type ShowCommittee ={
    name: string;
    image: string;
}

export type Committee ={
    name: string;
    imageUrl: string;
    about: string;
    referenceMaterialUrl:string;
    description: string;
    chairs: Chair[];
}

export type Chair = {
    name: string;
    image: string;
    position:string;
    socials: string;
}

export type Team ={
    name: string;
    image: string;
    position: string;
    instagram: string;
    linkedin: string;
    description: string;

}