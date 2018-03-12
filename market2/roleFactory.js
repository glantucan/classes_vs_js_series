
/**
 * Creates an object with the following prototype chain:
 * 
 *      ╾ role
 *          ┡ roleBehaviour_1
 *          ┝ ...
 *          ┝ roleBehaviour_N
 *          ┡ reqModelProp_1
 *          ┝ ...
 *          ┕ reqModelProp_N
 * 
 *     ╾ dataObj
 * 
 * @param {*} dataModel stateful model object. Must have accessor methods the role can use
 * @param {*} role stateless methodful object withe the methods that define the role behavior.
 * @param {String[]} requiredData Array of function names of the methods required by the role.
 * These methods will be composed with the role ones in a mixin
 */
function create(dataModel, role, requiredData) {

    var wrapper = {};
    /* Add required data model methods to the wrapper and bind their context to the dataModel,
        so they will execute in the scope of the dataModel ('this' inside a required method 
        will resolve to 'dataModel' instead of 'wrapper' ). That way if a required method of
        dataModel calls another not required method everything will work fine 
        (also if someone decides to use public properties, for some weird reason).
    */
    requiredData.forEach(function(reqProp) {
        if (dataModel[reqProp]) {
            wrapper[reqProp] = dataModel[reqProp].bind(dataModel) ;
        } else {
            throw Error("The data object can not fullfill this role requirements. It doesn't have a '" + reqProp + "' property");
        }
    });

    return Object.assign(wrapper, role);
}

export default create;
