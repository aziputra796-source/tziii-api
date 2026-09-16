#include <a_samp>
#include <streamer>

// DENAH RUMAH PRANK TROLL - VERSI SUSAH
public OnFilterScriptInit()
{
    print("[TROLL MAP] Rumah prank by tziii bb loaded");

    // --- TITIK MASUK (LOKASI BEBAS LU GANTI) ---
    // Ganti koordinat ini sama lokasi rumah lu
    new Float:X = 2495.0, Float:Y = -1690.0, Float:Z = 14.0;

    // Lantai dasar
    CreateDynamicObject(19353, X, Y, Z-1, 0, 0, 0, -1, -1, 300.0); // lantai besar

    // DINDING LUAR - KOTAK RUMAH
    CreateDynamicObject(19353, X+10, Y, Z+2, 0, 0, 0); // depan
    CreateDynamicObject(19353, X-10, Y, Z+2, 0, 0, 90); // samping
    CreateDynamicObject(19353, X, Y+10, Z+2, 0, 0, 0);
    CreateDynamicObject(19353, X, Y-10, Z+2, 0, 0, 90);

    // --- LORONG LOOP #7 - Muter terus (bikin pusing) ---
    CreateDynamicObject(19353, X+5, Y+5, Z+2, 0, 0, 45);
    CreateDynamicObject(19353, X+3, Y+5, Z+2, 0, 0, 0);
    CreateDynamicObject(19353, X+3, Y+3, Z+2, 0, 0, 90);
    CreateDynamicObject(19353, X+5, Y+3, Z+2, 0, 0, 180);

    // --- WC BUNTU - JALAN BUNTU ---
    CreateDynamicObject(19353, X-5, Y-5, Z+2, 0, 0, 0); // tembok buntu
    CreateDynamicObject(19353, X-5, Y-3, Z+2, 0, 0, 90);
    CreateDynamicObject(19353, X-7, Y-3, Z+2, 0, 0, 0); // jebakan

    // --- DAPUR JEBAKAN - LANTAI JEBOL ---
    CreateDynamicObject(19353, X-2, Y+7, Z+2, 0, 0, 0);
    // Kasih pickup jebakan biar jatuh
    CreateDynamicObject(19353, X-2, Y+7, Z-0.5, 0, 90, 0); // lantai miring

    // --- PINTU PALSU (TEMBOK PALSU) ---
    CreateDynamicObject(19353, X+9.9, Y, Z+2, 0, 0, 0); // keliatan kayak pintu tapi tembok

    // --- RUANG HARTA PALSU (KOTAK KOSONG) ---
    CreateDynamicObject(1271, X+8, Y+8, Z, 0, 0, 0); // koper kosong
    CreateDynamicObject(19353, X+8, Y+8, Z+2, 0, 0, 0); // dikurung tembok

    // Tambahin tembok invisible biar tambah susah
    CreateDynamicObject(19353, X, Y+2, Z+2, 0, 0, 20);
    CreateDynamicObject(19353, X, Y-2, Z+2, 0, 0, -20);
    CreateDynamicObject(19353, X+2, Y, Z+2, 0, 0, 70);

    return 1;
}

public OnPlayerConnect(playerid)
{
    SendClientMessage(playerid, -1, "{ff0000}[PRANK]{ffffff} Lu masuk rumah angker, coba keluar kalo bisa 🗿");
    return 1;
      }
