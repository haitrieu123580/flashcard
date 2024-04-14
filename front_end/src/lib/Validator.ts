// import BaseValidator from './BaseValidator';
// extends BaseValidator
export default class Validator {
    // static required(value) {
    //     return value ? undefined : 'messages.E0001';
    // }

    // static equals = (value1) => (value2) =>
    //     value2 && value1 && value1 !== value2 ? 'messages.E0007' : undefined;

    // static duplicate = (data) => (value) => {
    //     const keyData = data.map((item) => item?.key);
    //     let count = 0;
    //     let maxCount = 1;
    //     for (let i = 0; i < keyData.length; i++) {
    //         if (keyData[i] === value) {
    //             count++;
    //             if (count > maxCount) {
    //                 return 'messages.E0069';
    //             }
    //         }
    //     }
    //     return undefined;
    // };

    // static requiredImage(value) {
    //     return value ? undefined : 'messages.E0001';
    // }

    // static requiredInput(value) {
    //     return value ? undefined : 'messages.E0001';
    // }

    // static requiredSelectTemplate(value) {
    //     return value != '' && value && value?.length > 0
    //         ? undefined
    //         : 'messages.E0038';
    // }

    // static requiredCheckbox(value) {
    //     return value ? undefined : 'messages.E0037';
    // }

    // static maxLength = (max) => (value) =>
    //     value && value.length > max
    //         ? this.buildMessageWithParams('messages.E0006', { 1: max })
    //         : undefined;

    // static maxLengthInput = (max) => (value) =>
    //     value && value.length > max
    //         ? this.renderMessage('holon.E0006', { 1: max })
    //         : undefined;

    // static maxLengthArea = (max) => (value) =>
    //     value && value.length > max ? 'messages.E0006' : undefined;

    // static regex =
    //     (regex, msg = 'Error', isRequired = true) =>
    //         (value) => {
    //             try {
    //                 if (!regex) {
    //                     return undefined;
    //                 }
    //                 if (!value && !isRequired) {
    //                     return undefined;
    //                 }

    //                 regex = new RegExp(regex);
    //                 return regex.test(value) ? undefined : msg;
    //             } catch (error) {
    //                 return undefined;
    //             }
    //         };

    // static number = (value) =>
    //     !/^[0-9]*$/i.test(value) && value != null ? 'messages.E0071' : undefined;

    // static emailFormat = (value) =>
    //     value && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value)
    //         ? 'messages.E0003'
    //         : undefined;

    // static email = (value) =>
    //     value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(value)
    //         ? 'messages.E0003'
    //         : undefined;

    // static phone = (value) =>
    //     value && !/^\d{2}(?:\d{4}\d{4}|\d{8}|\d\d{3,4}\d{4})$/.test(value)
    //         ? 'messages.E0014'
    //         : undefined;

    // static password = (value) =>
    //     !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/i.test(value) && value != null
    //         ? 'messages.E0016'
    //         : undefined;

    // static fullNameFuri = (value) =>
    //     !/^[ァ-ヶー]{1,40}$/i.test(value) && value != null
    //         ? 'messages.E0001'
    //         : undefined;

    // static confirmPassword = (pass) => (value) => {
    //     return value != pass ? 'messages.E0007' : undefined;
    // };

    // static customValidator = (regex, mes) => (value) => {
    //     if (regex && value) {
    //         let newRegex = new RegExp(regex);
    //         return !newRegex.test(value) ? mes : undefined;
    //     }
    //     return undefined;
    // };

    // static URL = (value) => {
    //     return !/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/i.test(
    //         value,
    //     )
    //         ? 'messages.E0018'
    //         : undefined;
    // };

    // static stringKey = (value) => {
    //     // return !/^\S*$/i.test(value) ? "holon.E0002") : undefined
    //     return !/^[a-zA-Z0-9_]+$/i.test(value) ? 'holon.E0002' : undefined;
    // };
}
