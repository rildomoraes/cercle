export var ContactEdit = {
  start: function(userId, companyId, contactId, organizationId, opportunityId, opportunityContactIds, tagIds, jwtToken){

    $('#organization_remove_link').click(function(){
      $('#without_organization').show();
      $('#with_organization').hide();
    });


    $('#edit_contact_options').click(function(){
      $('#myModal2').modal('show');
    });

    $('#add_contact_to_opportunity').click(function(){
      $('#myModal3').modal('show');
    });

    $('#submit_contact_to_opportunity').click(function(){
      var contactName =$('#contact_name').val();
      $.ajax('/api/v2/contact', {
        method: 'POST',
        headers: {'Authorization': 'Bearer '+jwtToken},
        data: {
          'contact[name]': contactName,
          'contact[userId]': userId,
          'contact[companyId]': companyId,
          'contact[organizationId]': organizationId
        },
        success: function(result){
          var newContactId = result.data.id;
          opportunityContactIds.push(newContactId);
          var url = '/api/v2/opportunity/'+opportunityId;
          $.ajax( url , {
            method: 'PUT',
            headers: {'Authorization': 'Bearer '+jwtToken},
            data: {
              'opportunity[contactIds]': opportunityContactIds
            },
            complete: function(xhr, status){
              window.location = '/contact/' + newContactId;
            }
          });
        }
      });

    });

    /// MODAL TAGS
    $('#add_tags').click(function(){
      $('#myModal4').modal('show');
    });

    $('#contact_word2_id').selectize({delimiter: ',', create: true, items: tagIds});

    $('#submit_tag_id').click(function(){
      var organizationName = $('#contact_word2_id').val();
      var url = '/api/v2/contact/' + contactId +'/update_tags';
      $.ajax( url , {
        method: 'PUT',
        headers: {'Authorization': 'Bearer '+jwtToken},
        data: {
          'tags': organizationName,
          'companyId': companyId
        },
        complete: function(xhr, status){
          location.reload();
          return true;
        }
      });
    });

    /// MODAL COMPANY
    $('#contact_word_id').selectize({sortField: 'text', create: true});

    $('#change_company_modal').click(function(){
      $('#myModal').modal('show');
    });

    $('#submit_change_company').click(function(){
      var organizationName = $('#contact_word_id').val();
      if (!isNaN(organizationName)){
        var url = '/api/v2/contact/' + contactId;
        $.ajax( url , {
          method: 'PUT',
          headers: {'Authorization': 'Bearer '+jwtToken},
          data: { 'contact[organizationId]': organizationName },
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
          headers: {'Authorization': 'Bearer '+jwtToken},
          datatype: 'json',
          data: {
            'organization[name]': organizationName,
            'organization[companyId]': companyId
          },
          success: function(result){
            var newOrganizationId = result.data.id;
            var url2 = '/api/v2/contact/' + contactId;
            $.ajax( url2 , {
              method: 'PUT',
              headers: {'Authorization': 'Bearer '+jwtToken},
              data: { 'contact[organizationId]': newOrganizationId },
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
    $('#change_opportunity_stage').change(function(){
      var url = '/api/v2/opportunity/' + opportunityId;
      $.ajax( url , {
        method: 'PUT',
        headers: {'Authorization': 'Bearer '+jwtToken},
        data: { 'opportunity[board_column_id]': $(this).val() },
        complete: function(xhr, status){
          return true;
        }
      });
    });

    $('#change_opportunity_userId').change(function(){
      var url = '/api/v2/opportunity/' + opportunityId;
      $.ajax( url , {
        method: 'PUT',
        headers: {'Authorization': 'Bearer '+jwtToken},
        data: { 'opportunity[userId]': $(this).val() },
        complete: function(xhr, status){
          return true;
        }
      });
    });

    $('#opportunity_lost').click(function(){
      var url = '/api/v2/opportunity/' + opportunityId;
      $.ajax( url , {
        method: 'PUT',
        headers: {'Authorization': 'Bearer '+jwtToken},
        data: { 'opportunity[status]': 0 },
        complete: function(xhr, status){
          window.location = '/contact/' + contactId;
          return true;
        }
      });
    });

    $('#opportunity_add').click(function(){
      var boardColumn = $('#add_to_board').val();
      var url = '/api/v2/opportunity/';
      $.ajax( url , {
        method: 'POST',
        headers: {'Authorization': 'Bearer '+jwtToken},
        data: {
          'opportunity[main_contactId]': contactId,
          'opportunity[contactIds]': [contactId],
          'opportunity[userId]': userId,
          'opportunity[companyId]': companyId,
          'opportunity[name]': '',
          'opportunity[board_id]': boardColumn.split('--')[0],
          'opportunity[board_column_id]': boardColumn.split('--')[1]
        },
        complete: function(xhr, status){
          location.reload();
          return true;
        }
      });
    });

    $('#opportunity_win').click(function(){
      var url = '/api/v2/opportunity/' + opportunityId;
      $.ajax( url , {
        method: 'PUT',
        headers: {'Authorization': 'Bearer '+jwtToken},
        data: { 'opportunity[status]': 1 },
        complete: function(xhr, status){
          window.location = '/contact/' + contactId;
          return true;
        }
      });
    });

    // ADD ACTIVITY

    $('#activity_add').click(function(){
      var url = '/api/v2/activity/';
      $.ajax( url , {
        method: 'POST',
        headers: {'Authorization': 'Bearer '+jwtToken},
        data: { 'activity[contactId]': contactId,
          'activity[opportunityId]': opportunityId,
          'activity[userId]': userId,
          'activity[due_date]': new Date().toISOString(),
          'activity[companyId]': companyId,
          'activity[current_user_time_zone]': $(this).data('current_user_time_zone'),
          'activity[title]': 'Call'
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
        headers: {'Authorization': 'Bearer '+jwtToken},
        complete: function(xhr, status){
          window.location = '/opportunity';
          return true;
        }
      });
    });

    $('#organization_delete').click(function(){
      var url = '/api/v2/organizations/' + organizationId;
      $.ajax( url , {
        method: 'DELETE',
        headers: {'Authorization': 'Bearer '+jwtToken},
        complete: function(xhr, status){
          window.location = '/opportunity';
          return true;
        }
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
      if ($('#inputExperience').val() === '' ){
        alert('You need to write something ...');
      }
      else
      {
        $(this).find('input[type=submit]').attr('disabled', true);

        $.ajax('/api/v2/timeline_events', {
          method: 'POST',
          headers: {'Authorization': 'Bearer '+jwtToken},
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
            } else if(xhr.responseJSON.errors) {
              var messages = [];
              $.each(xhr.responseJSON.errors, function(index, value) {
                $.each(value, function(i, m){
                  messages.push(index + ' ' + m);
                });
              });
              alert(messages.join('\n'));
            } else if(xhr.responseJSON.message) {

              alert(xhr.responseJSON.message);
            } else {
              alert('Error occured');
            }
          }
        });
      }
    });
  }
};
