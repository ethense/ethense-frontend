const { configure, shallow, render, mount } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

configure({ adapter: new Adapter() })

// make enzyme functions available in all test files without import
global.shallow = shallow
global.render = render
global.mount = mount