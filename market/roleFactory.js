
/**
 * Creates an object with the following prototype chain:
 * 
 *      ┭ roleObjBehavior
 *      ┆   ┡ behaviour_1
 *      ┆   ┝ ...
 *      ┆   ┕ behaviour_N
 *      ┽ roleObj
 *      ┆   ┝ self
 *      ┆   ┝ decompose
 *      ┆   ┝ swap
 *      ┆   ┕ compose
 *      ┵ dataWrapper
 *          ┡ reqProp_1
 *          ┝ ...
 *          ┕ reqProp_N
 *          ╾ dataObj
 * 
 * @param {*} dataObj 
 * @param {*} roleBehaviorObj 
 * @param {String[]} requiredDataProps 
 */
function create(dataObj, roleBehaviorObj, requiredDataProps) {

    var dataWrapper;
    var roleObj;

    function self() {
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
            if (dataObj[reqProp]) {
                dataWrapper[reqProp] = dataObj[reqProp].bind(dataObj);
            } else {
                throw Error("The data object can not fullfill this role requirements. It doesn't have a '" + reqProp + "' property");
            }
        });

        roleObj = Object.create(dataWrapper);
        roleObj.compose = compose;
        roleObj.decompose = decompose;
        roleObj.swap = swap;
        roleObj.self = self;

        return Object.assign(Object.create(roleObj), roleBehaviorObj);
    }

    return compose(roleBehaviorObj, requiredDataProps);
}

export default create;