frappe.ui.form.on("Work Order", {
    onload: function(frm) {
        trigger_additional_cost_and_specs(frm);
    },
    production_item: function(frm) {
        trigger_additional_cost_and_specs(frm);
    },
    qty: function(frm) {
        update_additional_cost_amounts(frm);
    }
});

function trigger_additional_cost_and_specs(frm) {
    if (frm.doc.bom_no) {
        frappe.model.with_doc("BOM", frm.doc.bom_no, function() {
            let bom_doc = frappe.model.get_doc("BOM", frm.doc.bom_no);

            // Clear existing tables
            frm.clear_table("custom_additional_cost");
            frm.clear_table("custom_specifications");

            // === Additional Cost Table ===
            if (bom_doc.custom_additional_cost && bom_doc.custom_additional_cost.length > 0) {
                let bom_qty = bom_doc.quantity || 1; // BOM quantity

                bom_doc.custom_additional_cost.forEach(row => {
                    let d = frm.add_child("custom_additional_cost");

                    d.workstation = row.workstation;
                    d.expense_account = row.expense_account;
                    d.description = row.description;

                    // store per-unit amount
                    d.per_unit_amount = (row.amount || 0) / bom_qty;
                    d.amount = d.per_unit_amount * (frm.doc.qty || 1);
                    
                });

                frm.refresh_field("custom_additional_cost");
                
            }
           
            
            // === Specifications Table ===
            if (bom_doc.custom_specifications && bom_doc.custom_specifications.length > 0) {
                
                bom_doc.custom_specifications.forEach(row => {

                    let c = frm.add_child("custom_specifications");
                        c.name = row.name;
                        c.value = row.value;
                });

                frm.refresh_field("custom_specifications");
            }
        });
    }
}

function update_additional_cost_amounts(frm) {
    let wo_qty = frm.doc.qty || 1;

    frm.doc.custom_additional_cost.forEach(row => {
        if (row.per_unit_amount) {
            row.amount = row.per_unit_amount * wo_qty;
        }
    });

    frm.refresh_field("custom_additional_cost");
}







// frappe.ui.form.on("Work Order" ,{
//     onload(frm){
//        frappe.msgprint("onload field triggered!");
//         trigger_custom_additional_cost(frm);
//     },

//     production_item(frm){
//         frappe.msgprint("production item field triggered!");
//         trigger_custom_additional_cost(frm);
//     },
//     qty(frm){
//         frappe.msgprint("Qty field triggered!");
//         update_additional_cost_amounts(frm);
//     }

// });

// function trigger_custom_additional_cost(frm){
     
//      if(frm.doc.bom_no){ 
//         //  if has bom
//         frappe.msgprint("Bomb Fetch Successfully")
//         //  first it load from server then fetch 
//          frappe.model.with_doc("BOM" , frm.doc.bom_no, function () {
//         //  now fetch it 
//             let bom_doc = frappe.model.get_doc("BOM",frm.doc.bom_no);
//             frappe.msgprint(bom_doc);
//          // clear table
//             frm.clear_table("custom_additional_cost")

//         //  c// Check if BOM has data in child table
//             if( bom_doc.custom_additional_cost && bom_doc.custom_additional_cost.length > 0 ){
//                 let bom_qty = bom_doc.quantity || 1

//         //   NOW USE this loop to access each row of BOM CHILD TABLE
//                 bom_doc.custom_additional_cost.forEach(row => {

//         //  add data work order child table
//                 let d = frm.add_child("custom_additional_cost")
//                     d.workstation = row.workstation;
//                     d.expense_account = row.expense_account;
//                     d.description = row.description;
//                     d.per_unit_amount = (row.amount || 0 ) /bom_qty
//                     frappe.msgprint("last is work")
//                 });

//                 frm.refresh_field("custom_additional_cost")
//             }

//                 frappe.msgprint("hello")
//              //  Now Access Specifications Child Table

//                 if (bom_doc.custom_specifications && bom_doc.custom_specifications.length > 0 ) {
//                     frappe.msgprint("hello")

//                     bom_doc.custom_specifications.forEach(data => {
//                         frappe.msgprint("hello")
//                          let c = frm.add_child("custom_specifications")
//                         c.name = data.name
//                         c.value = data.value
//                         frappe.msgprint("hello")

//                     })

//                     frm.refresh_field("custom_specifications")
//                     frappe.msgprint("hao")

                    
//                 }

//          })
//      }


// }

// frappe.msgprint("hao")

// // This function calculate amount for work order quantity
// function update_additional_cost_amounts(frm){
//     frappe.msgprint("hao")
//     let wo_qty = frm.doc.qty || 1;

//     frappe.msgprint("Calculating for qty:", wo_qty);

//     frm.doc.custom_additional_cost.forEach(row => {
//         frappe.msgprint("Row before:", row.per_unit_amount, row.amount)
//         if(row.per_unit_amount){
//         row.amount = row.per_unit_amount * wo_qty

//         frappe.msgprint("Row after:", row.amount);
//         }
//     })

//      frm.refresh_field("custom_additional_cost")
    
// }
