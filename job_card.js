frappe.ui.form.on("Job Card", {
    work_order(frm) {
        technical_specs(frm);
    }
});

function technical_specs(frm) {
    frappe.msgprint("Hello");

    if (frm.doc.work_order) {
        // Fetch the Work Order Document
        frappe.model.with_doc("Work Order", frm.doc.work_order, function () {
            let work_order_doc = frappe.model.get_doc("Work Order", frm.doc.work_order);
            frappe.msgprint("Work Order Fetch Successfully");

            // Clear existing rows
            frm.clear_table("custom_specifications");

            if (work_order_doc.custom_specifications && work_order_doc.custom_specifications.length > 0) {
                work_order_doc.custom_specifications.forEach(row => {
                    let d = frm.add_child("custom_specifications");
                    d.name1 = row.name1;
                    d.value = row.value;

                    frappe.msgprint("Row Added: " + d.name1 + " - " + d.value);
                });

                frm.refresh_field("custom_specifications");
            }
        });
    }
}



















// frappe.ui.form.on("Job Card", {
//     work_order(frm){
//         technical_specs(frm)
//     }
// });

// function technical_specs(frm){
//     frappe.msgprint("Hello")
//     if (frm.doc.work_order){

//         frappe.model.with_doc("Work Order",frm.doc.work_order, function () {
//             let work_order_doc = frappe.model.get_doc("Work Order", frm.doc.work_order);
//              frappe.msgprint("Bom Fetch Successfully from Work order")

//             frm.clear_table( "custom_specifications" )

//         if (work_order_doc.custom_specifications && work_order_doc.custom_specifications.length > 0) {

//             work_order_doc.custom_specifications.forEach(row => {
//                 let d = frm.add_child("custom_specifications") ;

//                 d.name1 = row.name1 ;
//                 frappe.msgprint(d.name1) ;
//                 d.value = row.value ;

//                frappe.msgprint("value fetch ho gyi h") ;
                
//             });

//             frm.refresh_field("custom_specifications");
//         }
        
//     });

        
//     }
// }