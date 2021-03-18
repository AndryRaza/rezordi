$(document).ready(function(){

    $('#laravel_datatable_creneaux').DataTable({
        processing:false,
        serverSide: false,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.22/i18n/French.json"
        },
        
        responsive:true,
        dom: 'Bfrtip',
        ajax:'/creneaux-list',
        lengthMenu: [
            [ 10, 25, 50, -1 ],
            [ '10 lignes', '25 lignes', '50 lignes', 'Tout montrer' ]
        ],
        columns:[
            {data: 'utilisateur_id', name:'utilisateur_id'},
            {data: 'heure_debut', name:'heure_debut'},
            {data: 'heure_fin', name:'heure_fin'},
            {data: 'ordinateur_id',name:'ordinateur_id'},
            {data: 'attribuer', name:'attribuer', orderable:false, searchable:false},
        ]
    })

    $('#laravel_datatable_creneaux_detail').DataTable({
        processing:false,
        serverSide: false,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.22/i18n/French.json"
        },
        
        responsive:true,
        dom: 'Bfrtip',
        ajax:'/creneaux-list-detail',
        lengthMenu: [
            [ 10, 25, 50, -1 ],
            [ '10 lignes', '25 lignes', '50 lignes', 'Tout montrer' ]
        ],
        columns:[
            {data: 'utilisateur_id', name:'utilisateur_id'},
            {data: 'date', name:'date'},
            {data: 'heure_debut', name:'heure_debut'},
            {data: 'heure_fin', name:'heure_fin'},
            {data: 'ordinateur_id',name:'ordinateur_id'},
            {data: 'modifier', name:'modifier', orderable:false, searchable:false}
        ]
    })
})
