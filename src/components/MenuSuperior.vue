<template>
    <div class="menu">
        <ul class="lista-menu">
            <li class="dropdown_menu-item">
                <span>Inicio</span>
                <ul class="dropdown_submenu">
                    <li class="dropdown_submenu-item">
                        <a href="http://localhost:8080/#/" class="dropdown_submenu-link">Inicio</a> 
                    </li>
                </ul>
            </li>
            <li class="dropdown_menu-item">
                <span>Filmes</span>
                <ul class="dropdown_submenu">
                    <li class="dropdown_submenu-item">
                        <a href="" class="dropdown_submenu-link">Populares</a> 
                    </li>
                    <li class="dropdown_submenu-item">
                        <a href="" class="dropdown_submenu-link">Em cartaz</a>
                    </li>
                </ul>
            </li>
            <li class="dropdown_menu-item"> 
                <span>Mais</span>
                <ul class="dropdown_submenu">
                    <li class="dropdown_submenu-item">
                        <a href="#" class="dropdown_submenu-link">Suporte</a> 
                    </li>
                    <li class="dropdown_submenu-item">
                        <a href="https://www.themoviedb.org/documentation/api" class="dropdown_submenu-link">API</a> 
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'MenuSuperior',
        data() {
            return {

            };
        },
    };
</script>

<style scoped>
    .menu 
    {
        box-sizing: border-box;
        background-image: linear-gradient(to right, #01507a, #02a3fa);
        padding: 5px;
    }
    .lista-menu 
    {
        display: flex;
        list-style: none;
        margin: 0px;
        padding: 0px;
    }
    .dropdown_menu-item
    {
        color: #fff;
        padding: 18px;
        margin: 2px;
        position: relative;

    }
    .dropdown_menu-item:hover
    {
        cursor: pointer;
    }
    .dropdown_menu-item:hover ul {
        display:block;
    }
    .dropdown_submenu
    {
        background-color: #fff;
        border-radius: 5px;
        list-style: none;
        box-shadow: 0px 2px 18px rgba(233, 236, 240, 0.842);
        position:absolute;
        margin: 0px;
        padding: 18px;
        width: 180px;
        left: 0;
        display: none;
    }
    .dropdown_submenu-item a
    {
        text-decoration: none;
    }

</style>
