"use client";
// TODO: implement cursors and pagination.
//
//

import { useState } from "react";

export type dataCell = {
    timeID: number,
    text: string,
    completed: boolean
};


/**
 * We are storing data inside local indexedDB.
 * DB name - "todoSavedData"
 * ObjectStore - "main"
 * 
 * 
 * 
 */

var isDBOpened = false;
let db: IDBDatabase;
function openDBinternal(
    resolve: ( value: dataCell[] ) => void,
    reject: ( error: DOMException ) => void
) {
    let openDB = indexedDB.open("todoSavedData",1);

    openDB.onupgradeneeded = (ev) => {
        let db = openDB.result;
        switch(ev.oldVersion) {
            case 0:
                let mainStore = db.createObjectStore("main", {
                    keyPath: "timeID"
                });
                mainStore.add({
                    timeID: 1721029224272,
                    text: "Make this app",
                    completed: false
                });
                break;
            case 1:
                break;
        }
    }

    openDB.onsuccess = () => {
        db = openDB.result;
        db.onversionchange = () => { db.close(); alert("Local storage is outdated; Reload needed"); location.reload(); }

        let getTheData = db.transaction("main","readonly");
        let data = getTheData.objectStore("main").getAll()
        data.onsuccess = () => {
            let todoData = data.result as dataCell[];
            isDBOpened = true;
            resolve(todoData as dataCell[]);
        }
        data.onerror = () => {
            reject(data.error as DOMException);
        }
    }

    openDB.onerror = () => {
        reject(openDB.error as DOMException);
    }
}


export function openDB() {
    return new Promise(
        (
            resolve: ( value: dataCell[] ) => void,
            reject: ( error: DOMException ) => void
        ) => {
            if(!isDBOpened) {
                openDBinternal(resolve,reject);
            } else {
                
            }
        }
    );
}

export function setDBData(newData: dataCell) {
    return new Promise(
        (
            resolve: (value: null) => void,
            reject: (error: any) => void
        ) => {
            if(!isDBOpened) {
                reject(new Error("Db is not opened"));
            } else {
                let transaction = db.transaction("main","readwrite");
                let write = transaction.objectStore("main").put(newData);
                write.onsuccess = () => {
                    resolve(null);
                }
                write.onerror = () => {
                    reject(write.error);
                }
            }
        }
    )
}