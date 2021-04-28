export class Select {
    constructor() {

    }

    render() {
        return `<div class="form-group">
                    <lable for="urgency">Select urgency</lable>
                    <select class="form-control visit-form-input" id="urgency" name="urgency">
                        <option value="normal">Normal</option>
                        <option value="priority">Priority</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>`
    };

};
