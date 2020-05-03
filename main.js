document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e){
    var issueDesc = document.getElementById('issueDescInput').nodeValue;
    var issueSeverity = document.getElementById('issueSeverityInput').nodeValue;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').nodeValue;
    var issueId = Math.floor(Math.random() * Math.floor(100000));
    var issueStatus = 'Open';

    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if (localStorage.getItem('issues') == null){
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues))
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();
    fetchIssues();
    e.preventDefault();
}


function fetchIssues(){
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesListed = document.getElementById('issuesList');


    issuesList.innerHTML = '';

    for (let i = 0; i < issues.length; i++){
        let id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        issuesList.innerHTML += '<div class="well">' + 
                                '<h6>Issue ID: ' + id + '</h6>'+ 
                                '<p><span class="label label-info">' + status + '</span></p>' +
                                '<h3>' + desc + '</h3>'+
                                '<p><span class="glyphicon glyphicon-time"></span>' + severity + '</p>'+
                                '<p><span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>'+
                                '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>'+
                                '<a href="#" onclick="deleteIssue(\''+id+'\') class="btn btn-danger">Delete</a>'+
                                '</div>';
                            }   
}