
export default class Constants {
    static ACCESS_TOKEN = 'access_token';
    static REFRESH_TOKEN = 'refresh_token';
    static PUBLIC_ROUTES = ['/', '/services', '/jobs', '/case-study', '/inquiry'];

    static INPUT_TYPE = {
        TEXT: 'text',
        EMAIL: 'email',
        PASSWORD: 'password',
        CHECKBOX: 'checkbox',
        CIRCLE_CHECKBOX: 'circle_checkbox',
        SELECT: 'select',
        TEXTAREA: 'textarea',
        MONTH_PICKER: 'month_picker',
        MONTH_RANGE_PICKER: 'month_range_picker',
        EDITOR: 'editor',
        FILE_UPLOAD: 'file',
        RADIO: 'radio',
        INPUT_CHECK: 'input_check',
        RE_CAPTCHA: 're_captcha',
    };

    static DEFAULT_PAGESIZE = 6;

    static SORT_BY = [
        {
            key: "latest",
            label: "Latest"
        },
        {
            key: "oldest",
            label: "Oldest"
        },
        {
            key: "desc",
            label: "Z-A"
        },
        {
            key: "asc",
            label: "A-Z"
        },
    ]

    static ROLE = {
        ADMIN: 1,
        USER: 10,
    }

    static PAGINATION = {
        LIMIT: 6,
        SIBLING_COUNT: 8,
    };
}
