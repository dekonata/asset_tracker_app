const str = "server hardware";

const news = str.replace(' ', '_')

console.log(news)

const obj = {
    fields: {
        name: 'test'
    }
}

console.log(obj['fields'])

const x = 1;
const y = 2;
const c = (obj['test'] = 'TOOT', obj);
console.log(c);

const desObj = { asset: 'food', nae: 'bill'}
desArr = [1,2,3,4]

const [asset, ...rest] = desArr;

console.log(asset);

const stateObj = {

}

function testState(somevalue) {
    stateObj['state'] = somevalue
    function updateValue(newValue) {
        stateObj['state'] = newValue;
        return
    } 
    return [stateObj['state'], updateValue ];
}

const  [somevalue, setSomevalue] = testState('TEST');

console.log(somevalue);
setSomevalue('UPDATED');
console.log(somevalue);
console.log(stateObj);

const fields = {
    make: 'Lenovo',
    model: 'X222'
}

fields['make'] = 'Dell'

console.log({...fields, type: 'Lenovo'})

const DEFAULT_FIELDS = [
	{name: 'serialnumber', data_type: 'Mixed Length Text', input_type: 'Text', is_unique: true},
	{name: 'make', data_type: 'Mixed Length Text', input_type: 'Suggest', is_unique: false},
	{name: 'model', data_type: 'Mixed Length Text', input_type: 'Suggest', is_unique: false}	
]


DEFAULT_FIELD_NAMES = DEFAULT_FIELDS.map(fieldObj => fieldObj.name)

console.log(DEFAULT_FIELD_NAMES.includes('serialnumber'))