let ContactLive = {
  init(socket, contact_id){

    // connect to the socket
    socket.connect()
   
   // Now that you are connected, you can join channels with a topic:
   let channel = socket.channel("contacts:" + contact_id, {})
   
   let tasks = $("#tasks")  
   let timeline_events = $("#timeline_events")   
   
   channel.on('new:activity', payload => {
    tasks.append(payload.html)
    this.activities_init()
   })

  channel.on('new:timeline_event', payload => {
    timeline_events.prepend(payload.html)
  })
   
   channel.join()
     .receive("ok", resp => {  console.log("Join OK", resp);this.activities_init(); })
     .receive("error", resp => { console.log("Unable to join", resp) })
  },

  activities_init() {
    $('.activity_delete').click(function(){
      var task_id = $(this).data('id');
      var url = '/api/v2/activity/' + task_id;
      $.ajax( url , {
          method: 'DELETE',
          complete: function(xhr, status){
            $('#row_task_'+task_id).remove();
            $(this).empty();
            return true;
          }
      });
    });

    $(".activity_title").on('change', function(){
      var new_title = $(this).val();
      var url = '/api/v2/activity/' + $(this).data('id');
      $.ajax( url , {
          method: 'PUT',
          data: { 'activity[title]': new_title },
          complete: function(xhr, status){
            return true;
          }
      });
    });

    $(".activity_user_id").on('change', function(){
      var user_id = $(this).val();
      var url = '/api/v2/activity/' + $(this).data('id');
      $.ajax( url , {
          method: 'PUT',
          data: { 'activity[user_id]': user_id },
          complete: function(xhr, status){
            return true;
          }
      });
    });

    $(".datepicker").on('change', function(){
      try {
        var task_date_item = $("#task_date_"+ $(this).data('id'));
        var task_hour_item = $("#task_hour_"+ $(this).data('id'));
  
        var new_year = task_date_item.val().split("/")[2];
        var new_month = task_date_item.val().split("/")[0];
        var new_day = task_date_item.val().split("/")[1];
  
        var hour = task_hour_item.val().split(":")[0];
        var minute = task_hour_item.val().split(":")[1];
  
        var new_date_string =  new_year +'-'+ new_month+ '-'+ new_day+'T'+hour +':'+ minute +':00Z';
        var new_date = new Date( new_date_string);
      
        var new_date_to_send = new_date.toISOString();
        
        var url = '/api/v2/activity/' + $(this).data('id');
        $.ajax( url , {
            method: 'PUT',
            data: { 'activity[due_date]': new_date.toISOString() },
            complete: function(xhr, status){
              return true;
            }
        });
        }
      catch(err) {
        task_date_item.val(task_date_item.data("default"));
        task_hour_item.val(task_hour_item.data("default"));
      }
    });

    //// SAME CODE 
    $(".timepicker").on('change', function(){
      try {
        var task_date_item = $("#task_date_"+ $(this).data('id'));
        var task_hour_item = $("#task_hour_"+ $(this).data('id'));
  
        var new_year = task_date_item.val().split("/")[2];
        var new_month = task_date_item.val().split("/")[0];
        var new_day = task_date_item.val().split("/")[1];
  
        var hour = task_hour_item.val().split(":")[0];
        var minute = task_hour_item.val().split(":")[1];
        var new_date_string =  new_year +'-'+ new_month+ '-'+ new_day+' '+hour +':'+ minute;
        var new_date = new Date(new_date_string); 
        var new_date_to_send = new_date.toISOString();
        
        var url = '/api/v2/activity/' + $(this).data('id');
        $.ajax( url , {
            method: 'PUT',
            data: { 'activity[due_date]': new_date.toISOString() },
            complete: function(xhr, status){
              return true;
            }
        });
        }
      catch(err) {
        task_date_item.val(task_date_item.data("default"));
        task_hour_item.val(task_hour_item.data("default"));
      }
    });
    
    $('.datepicker').datepicker();
  
    $('.activity_toggle').iCheck({
       checkboxClass: 'icheckbox_square-blue',
       radioClass: 'iradio_square-blue',
       increaseArea: '20%' // optional
    });

    $('.activity_toggle').on('ifToggled', function(event){
      var url = '/api/v2/activity/' + $(this).data('id');
      var that = $(this);
      $.ajax( url , {
          method: 'PUT',
          data: { 'activity[is_done]': $(this).is(":checked") },
          complete: function(xhr, status){
            if(that.is(":checked")){
              $('#row_task_'+that.data('id')).remove();
            }
            return true;
          }
      });
    });


  }
}

export default ContactLive



