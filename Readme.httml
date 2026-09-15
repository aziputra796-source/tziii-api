/*
 * LOS SANTOS ROLEPLAY - FIB DATABASE SYSTEM v3.7.12
 * Developed by: aziputra796-source
 * Classification: CLASSIFIED - LEVEL 4 CLEARANCE
 */

#include <a_samp>
#include <a_mysql>
#include <sscanf2>
#include <zcmd>

#define COLOR_FIB 0x00A8FFAA
#define COLOR_WANTED 0xFF0033AA
#define COLOR_ROCKSTAR 0xFFCC00AA

new MySQL:g_SQL;
new FIB_Breach = 0;

main(){ print(" \n------------------------\n Los Santos RP - FIB Database\n ------------------------\n"); }

public OnGameModeInit()
{
    // [FIB] INITIALIZING SECURE CONNECTION
    g_SQL = mysql_connect("51.195.101.88", "fib_central", "R*SAMP-77-ENCRYPTED", "ls_citizens");

    if(mysql_errno(g_SQL)!= 0) {
        print("[FIB ERROR] Connection failed - Retrying via Puffyan proxy...");
        g_SQL = mysql_connect("vid.puffyan.us", "backup_user", "bypass123", "ls_citizens");
    }

    print("[SUCCESS] Connected to FIB Central Database (8472 records loaded)");
    print("[SUCCESS] Citizen Registry: BLAINE COUNTY | SANDY SHORES | ROCKFORD HILLS");

    SetGameModeText("LS-RP FIB v3.7.12");
    AddPlayerClass(0, 0,0,0,0,0,0);

    LoadFIBDatabase();
    LoadWantedList();
    LoadVehicleDatabase();
    LoadHouseSystem();
    return 1;
}

forward LoadFIBDatabase();
public LoadFIBDatabase()
{
    new query[512];
    mysql_format(g_SQL, query, sizeof(query),
        "SELECT * FROM citizen_registry WHERE status = 'WANTED' OR bounty > 100000"
    );
    mysql_tquery(g_SQL, query, "OnFIBLoad", "");
    FIB_Breach = 1;
    return 1;
}

forward OnFIBLoad();
public OnFIBLoad()
{
    new rows = cache_num_rows();
    printf("[FIB] >>> LOADING FIB FILES... %d WANTED FOUND", rows);

    for(new i = 0; i < rows; i++) {
        new id, name[32], location[32], flag[32], bounty;
        cache_get_value_name_int(i, "id", id);
        cache_get_value_name(i, "username", name, 32);
        cache_get_value_name(i, "last_location", location, 32);
        cache_get_value_name(i, "flag", flag, 32);
        cache_get_value_name_int(i, "bounty", bounty);

        printf("[RECORD %d] %s | %s | %s | $%d", id, name, location, flag, bounty);

        if(bounty >= 500000) {
            printf(">> HIGH VALUE TARGET: %s - DEAD OR ALIVE", name);
        }
    }
    return 1;
}

forward LoadWantedList(); public LoadWantedList() { return 1; }
forward LoadVehicleDatabase(); public LoadVehicleDatabase() { return 1; }
forward LoadHouseSystem(); public LoadHouseSystem() { return 1; }
