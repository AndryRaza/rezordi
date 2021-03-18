$(document).ready(function(){

    $('#laravel_datatable').DataTable({
        processing:false,
        serverSide: false,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.22/i18n/French.json"
        },
        
        responsive:true,
        dom: 'Bfrtip',
        ajax:'/utilisateur-list',
        lengthMenu: [
            [ 10, 25, 50, -1 ],
            [ '10 lignes', '25 lignes', '50 lignes', 'Tout montrer' ]
        ],
        columns:[
            {data: 'nom', name:'nom'},
            {data: 'prenom', name:'prenom'},
            {data: 'voir', name:'voir', orderable:false, searchable:false},
        ]
    })


    $('#laravel_datatable_utilisateur_detail').DataTable({
        processing:false,
        serverSide: false,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.22/i18n/French.json"
        },
        
        responsive:true,
        dom: 'Bfrtip',
        ajax:'/utilisateur-list-detail',
        lengthMenu: [
            [ 10, 25, 50, -1 ],
            [ '10 lignes', '25 lignes', '50 lignes', 'Tout montrer' ]
        ],
        columns:[
            {data: 'nom', name:'nom'},
            {data: 'prenom', name:'prenom'},
            {data: 'created_at', name:'created_at'},
            {data: 'updated_at', name:'updated_at'},
            {data: 'désactiver', name:'désactiver', orderable:false, searchable:false},
            {data: 'voir', name:'voir', orderable:false, searchable:false}
          
        ]
    })






})
