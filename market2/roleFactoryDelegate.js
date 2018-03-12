
/**
 * Creates an object with the following prototype chain:
 * 
 *      ┭ roleObjBehavior
 *      ┆   ┡ behaviour_1
 *      ┆   ┝ ...
 *      ┆   ┕ behaviour_N
 *      ┵ dataWrapper
 *          ┡ reqProp_1
 *          ┝ ...
 *          ┕ reqProp_N
 *          ╾ dataObj
 * 
 * @param {*} dataModel stateful model object. Must have accessor methods the role can use
 * @param {*} role stateless methodful object withe the methods that define the role behavior.
 * @param {String[]} requiredData Array of function names of the methods required by the role.
 * These methods will be added to the dataWrapper object which the role delegates on to
 * retrieve model data.
 */
function create(dataModel, role, requiredData) {

    var dataWrapper = {};
    // Add required data model methods to the dataWrapper and bind their context to the dataModel, so they will execute in the scope of the dataModel (this will point to dataModel instead of dataWrapper as it would happen without the binding)
    requiredData.forEach(function(reqProp) {
        if (dataModel[reqProp]) {
            dataWrapper[reqProp] = dataModel[reqProp].bind(dataModel);
        } else {
            throw Error("The data object can not fullfill this role requirements. It doesn't have a '" + reqProp + "' property");
        }
    });

    return Object.assign(Object.create(dataWrapper), role);
}

export default create;