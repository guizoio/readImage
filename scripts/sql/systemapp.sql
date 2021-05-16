--#login#
    select 
        * 
    from 
        equipe 
    where 
        apagado = 0 and 
        nomeTime = cast(@equipe as varchar(max))
--END#login#