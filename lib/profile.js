var parse = function (json) {
    if (typeof json === 'string') {
        json = JSON.parse(json);
    }

    var profile = {};

    profile.id = json.id;
    profile.username = json.id;
    if (json.namePerson) {
        profile.name = json.namePerson;
    }

    if (json['contact/email']) {
        profile.emails = [
            { value: json['contact/email'] }
        ];
    }

    return profile;
};

// ## //

exports.parse = parse;
