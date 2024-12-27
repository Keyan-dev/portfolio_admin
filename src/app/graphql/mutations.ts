import { gql } from "apollo-angular";
//For Create new code lab
export const CREATE_CODE_LAB_MUTATION=gql`
    mutation createCodeLab($codeLab: codeLabInput) {
        createCodeLab(codeLab: $codeLab) {
            id
            name
        }
    }
`;
//For Delete existing code lab
export const DELETE_CODE_LAB_MUTATION=gql`
    mutation deleteExistingCodelab($deleteCodeLabId: ID!) {
        deleteCodeLab(id: $deleteCodeLabId) {
            acknowledged
        }
    }
`;