export var ContactEdit = {
  start: function(user_id, company_id, contact_id, organization_id, opportunity_id, opportunity_contact_ids, tag_ids){
    

    

    $("#organization_remove_link").click(function(){
      $('#without_organization').show();
      $('#with_organization').hide();
    });
  
    
  
    $( "#edit_contact_options" ).click(function(){
      $('#myModal2').modal('show');
    });

    $( "#add_contact_to_opportunity" ).click(function(){
      $('#myModal3').modal('show');
    });

    

    $("#submit_contact_to_opportunity").click(function(){
      var contact_name =$("#contact_name").val();
      $.ajax('/api/v2/contact', {
        method: 'POST',
        data: { 
          'contact[name]': contact_name,
          'contact[user_id]': user_id,
          'contact[company_id]': company_id, 
          'contact[organization_id]': organization_id, 
         },
        success: function(result){
          var contact_id = result.data.id;
          opportunity_contact_ids.push(contact_id);
          var url = '/api/v2/opportunity/'+opportunity_id;
          $.ajax( url , {
            method: 'PUT',
            data: { 
              'opportunity[contact_ids]': opportunity_contact_ids
            },
            complete: function(xhr, status){
              window.location = "/contacts/" + contact_id;
            }
          });
        }
      });
      
    });

    /// MODAL TAGS
    $( "#add_tags" ).click(function(){
      $('#myModal4').modal('show');
    });

    $('#contact_word2_id').selectize({delimiter: ',', create: true, items: tag_ids});

    $("#submit_tag_id").click(function(){
      var organization_name = $("#contact_word2_id").val();
      var url = '/api/v2/contact/' + contact_id+"/update_tags";
        $.ajax( url , {
          method: 'PUT',
          data: { 'tags': organization_name,
                  'company_id': company_id
           },
          complete: function(xhr, status){
            location.reload();
            return true;
          }
        });
    });


    /// MODAL COMPANY
    $('#contact_word_id').selectize({sortField: 'text', create: true});
    
    $( "#change_company_modal" ).click(function(){
      $('#myModal').modal('show');
    });

    $("#submit_change_company").click(function(){
      var organization_name = $("#contact_word_id").val();
      if (!isNaN(organization_name)){
        var organization_id = organization_name;
        var url = '/api/v2/contact/' + contact_id;
        $.ajax( url , {
          method: 'PUT',
          data: { 'contact[organization_id]': organization_id },
          complete: function(xhr, status){
            location.reload();
            return true;
          }
        });
      }
      else{
        var url = '/api/v2/organizations/';
        $.ajax( url , {
          method: 'POST',
          datatype: 'json',
          data: { 
            'organization[name]': organization_name,
            'organization[company_id]': company_id,
          },
          success: function(result){
            var organization_id = result.data.id;
            var url = '/api/v2/contact/' + contact_id;
            $.ajax( url , {
              method: 'PUT',
              data: { 'contact[organization_id]': organization_id },
              complete: function(xhr, status){
                location.reload();
                return true;
              }
            });
          }
        });
      }
    });
  
  
  
    //EDIT OPPORTUNITY IN CONTACT PAGE
    $( "#change_opportunity_stage" ).change(function(){
        var url = '/api/v2/opportunity/' + opportunity_id;
        $.ajax( url , {
          method: 'PUT',
          data: { 'opportunity[stage]': $(this).val() },
          complete: function(xhr, status){
            return true;
          }
        });
    });
  
    $( "#change_opportunity_user_id" ).change(function(){
        var url = '/api/v2/opportunity/' + opportunity_id;
        $.ajax( url , {
          method: 'PUT',
          data: { 'opportunity[user_id]': $(this).val() },
          complete: function(xhr, status){
            return true;
          }
        });
    });
  
    $('#opportunity_lost').click(function(){
      var url = '/api/v2/opportunity/' + opportunity_id;
      $.ajax( url , {
          method: 'PUT',
          data: { 'opportunity[status]': 2 },
          complete: function(xhr, status){
            location.reload();
            return true;
          }
        });
    });
  
    $('#opportunity_add').click(function(){
      var url = '/api/v2/opportunity/';
      $.ajax( url , {
          method: 'POST',
          data: { 
            'opportunity[main_contact_id]': contact_id, 
            'opportunity[contact_ids]': [contact_id], 
            'opportunity[user_id]': user_id, 
            'opportunity[company_id]': company_id, 
            'opportunity[name]': '', 
          },
          complete: function(xhr, status){
            location.reload();
            return true;
          }
      });
    });
  
    $('#opportunity_win').click(function(){
      var url = '/api/v2/opportunity/' + opportunity_id;
      $.ajax( url , {
          method: 'PUT',
          data: { 'opportunity[status]': 1 },
          complete: function(xhr, status){
            location.reload();
            return true;
          }
        });
    });
  
    // ADD ACTIVITY
  
    $('#activity_add').click(function(){
      var url = '/api/v2/activity/';
      $.ajax( url , {
          method: 'POST',
          data: { 'activity[contact_id]': contact_id, 
            'activity[user_id]': user_id, 
            'activity[due_date]': new Date().toISOString(), 
            'activity[company_id]': company_id,
            'activity[current_user_time_zone]': $(this).data('current_user_time_zone'),
            'activity[title]': 'Call', 
          },
          complete: function(xhr, status){
            return true;
          }
        });
    });


  // DELETE CONTACT

    $('#contact_delete').click(function(){
      var url = '/api/v2/contact/' + $(this).data('id');
      $.ajax( url , {
          method: 'DELETE',
          complete: function(xhr, status){
            window.location = "/opportunity";
            return true;
          }
        });
    });
  
    $('#organization_delete').click(function(){
      var url = '/api/v2/organizations/' + organization_id;
      $.ajax( url , {
          method: 'DELETE',
          complete: function(xhr, status){
            window.location = "/opportunity";
            return true;
          }
        });
    });
  
    // EDIT INLINE FIELD CONTACT
    $('.inline-editable').each(function(index){
      var ele = $(this);
  
      if(ele.text() == "") {
        ele.addClass('inline-edit-empty');
      } else {
        ele.removeClass('inline-edit-empty');
      }
  
      ele.click(function(){
        ele.hide();
        var editContainer = $("<span class='editable-container'><form class='form-inline editableform'><div class='editable-input'></div><div class='editable-buttons'><button class='btn btn-primary btn-xs editable-submit'><i class='fa fa-check'></i></button><a class='btn btn-default btn-xs editable-cancel'><i class='fa fa-times'></i></a></div></form</span>");
        var inputElement;
        if (ele.data('input-type') == 'textarea'){
          inputElement = $("<textarea style='width:100%;height:80px;' ></textarea>");
          editContainer.find('.editable-container').css('display', 'block !important');
          editContainer.find('.editable-input').css('display', 'block');
          editContainer.find('.editable-input').append(inputElement);
        }
        else{
          inputElement = $("<input style='height: 25px;width: 125px;' class='form-control input-sm' type='text' />");
          editContainer.find('.editable-input').append(inputElement);
        }
  
        
        inputElement.val(ele.text());
        editContainer.find("form").submit(function(e){
          e.preventDefault();
  
          var params = {};
          params[ele.data('param-name')] = inputElement.val();
  
          $.ajax(ele.data('inline-editurl'), {
            type: ele.data('type'),
            data: params,
            success: function(xhr, st){
              ele.text(params[ele.data('param-name')]);
              editContainer.find('.editable-cancel').trigger('click');
            }
          })
        });
  
        editContainer.find('.editable-cancel').click(function(e){
          e.preventDefault();
          editContainer.remove();
          ele.show();
  
          if(ele.text() == "") {
            ele.addClass('inline-edit-empty');
          } else {
            ele.removeClass('inline-edit-empty');
          }
        });
  
        editContainer.insertAfter(ele);
      });
    });
  
    // POST TIMELINE_EVENT
    $('.btn-actiontype').click(function(){
      $('.btn-actiontype').removeClass('submit-commit-active');
      $(this).addClass('submit-commit-active');
      $('#te_action_type').val($(this).data('event_name'));
    });
  
    $('#contact-form').submit(function(e){
      e.preventDefault();
      if ($("#inputExperience").val() == "" ){
        
        alert("You need to write something ...")
      }
      else
      {
        $(this).find('input[type=submit]').attr('disabled', true);
    
        $.ajax('/api/v2/timeline_events', {
          method: 'POST',
          data: new FormData(this),
          processData: false,
          contentType: false,
          complete: function(xhr, status){
            $(this).find('input[type=submit]').removeAttr('disabled');
            console.log([xhr, status]);
    
            if(xhr.responseJSON.data && xhr.responseJSON.data.id) {
              $('#inputExperience').val('');
              $('#submit_timeline_event').removeAttr('disabled');
              return true;
            } else {
              if(xhr.responseJSON.errors) {
                messages = [];
                $.each(xhr.responseJSON.errors, function(index, value) {
                  $.each(value, function(i, m){
                    messages.push(index + ' ' + m);
                  });
                });
                alert(messages.join("\n"));
              } else {
                if(xhr.responseJSON.message) {
                  alert(xhr.responseJSON.message);
                } else {
                  alert('Error occured');
                }
              }
            }
          }
        });
      }
    });
  }
}




