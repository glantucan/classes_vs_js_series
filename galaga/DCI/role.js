/**
 * Creates an object with the following prototype chain:
 *      ┭ dataObj
 *      ┆   ┡ prop_1
 *      ┆   ┝ ...
 *      ┆   ┕ prop_N
 *      ┽ roleInterfaceObj
 *      ┆   ┡ self
 *      ┆   ┕ unwrapObj
 *      ┵ behaviorObj
 *          ┡ behaviour_1
 *          ┝ ...
 *          ┕ behaviour_N
 * @param {*} dataObj 
 * @param {*} behaviourObj 
 * @param {*} requires 
 */
/* function assignRole(dataObj, behaviourObj) {
    var roleObj = Object.create(dataObj);
    roleObj.unwrapRole = unwrapRole;
    

    function unwrapRole(roleObj) {
        return dataObj;
    }
    return Object.assign(dataWrapper, Object.create(roleObj));
} */


/**
 * Creates an object with the following prototype chain:
 * 
 *      ╾ dataObj
 * 
 *      ┭ dataWrapper
 *      ┆   ┡ reqProp_1
 *      ┆   ┝ ...
 *      ┆   ┕ reqProp_N
 *      ┽ roleObj
 *      ┆   ┝ swapRole
 *      ┆   ┝ self
 *      ┆   ┕ unwrapRole
 *      ┵ roleObjBehavior
 *          ┡ behaviour_1
 *          ┝ ...
 *          ┕ behaviour_N
 * 
 * @param {*} dataObj 
 * @param {*} roleBehaviorObj 
 * @param {String[]} requiredDataProps 
 */
function create(dataObj, roleBehaviorObj, requiredDataProps) {

    var dataWrapper;
    var roleObj;

    function getData() {
        return dataObj;
    }
    function decompose() {
        return roleObj;
    }
    function swap(newRoleBehavior, requiredDataProps) {
        this.decompose().compose(newRoleBehavior, requiredDataProps);
    }
    function compose(roleBehavior, requiredDataProps) {
        dataWrapper = {};
        
        requiredDataProps.forEach(function(reqProp) {
            if (dataObj.hasOwnProperty)
            dataWrapper[reqProp] = dataObj[reqProp].bind(dataObj);
        });
        roleObj = Object.create(dataWrapper);
        roleObj.compose = compose;
        roleObj.decompose = decompose;
        roleObj.swap = swap;
        roleObj.self = getData;

        return Object.assign(Object.create(roleObj), roleBehaviorObj);
    }

    return compose(roleBehaviorObj, requiredDataProps);
}

export default {create};