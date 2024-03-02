---
title: 2_postgres.md
description: |-
	내용입력
date: Insert datetime string (⇧⌘I or Ctrl+Shift+I)
preview: 이미지 주소
draft: false
tags:
	- 테그없음
categories:
	- 카테고리없음
---

## Postgres 설치

[![Image](https://www.postgresql.org/media/img/about/press/elephant.png)](https://www.postgresql.org/)

🔗 링크 : <https://postgresql.org>

### App 다운로드

[![Image](https://postgresapp.com/img/PostgresAppIconLarge.png)](https://postgresapp.com)

🔗 링크 : <https://postgresapp.com>

> [!NOTE]
> app 으로 설치시 terminal 설정c

#### 📃 .zhsrc

```bash
export PATH=$PATH:/Applications/Postgres.app/Contents/Versions/latest/bin
```

#### 🪄 사용법

```bash
nangmauncode@backsudogoui-MacBookAir whatsup % psql
psql (16.2 (Postgres.app))
Type "help" for help.

nangmauncode=#
```

### 명령어 모음

```bash
mydb-# \?
General
  \bind [PARAM]...       set query parameters
  \copyright             show PostgreSQL usage and distribution terms
  \crosstabview [COLUMNS] execute query and display result in crosstab
  \errverbose            show most recent error message at maximum verbosity
  \g [(OPTIONS)] [FILE]  execute query (and send result to file or |pipe);
                         \g with no arguments is equivalent to a semicolon
  \gdesc                 describe result of query, without executing it
  \gexec                 execute query, then execute each value in its result
  \gset [PREFIX]         execute query and store result in psql variables
  \gx [(OPTIONS)] [FILE] as \g, but forces expanded output mode
  \q                     quit psql
  \watch [[i=]SEC] [c=N] execute query every SEC seconds, up to N times

Help
  \? [commands]          show help on backslash commands
  \? options             show help on psql command-line options
  \? variables           show help on special variables
  \h [NAME]              help on syntax of SQL commands, * for all commands

Query Buffer
  \e [FILE] [LINE]       edit the query buffer (or file) with external editor
  \ef [FUNCNAME [LINE]]  edit function definition with external editor
  \ev [VIEWNAME [LINE]]  edit view definition with external editor
  \p                     show the contents of the query buffer
  \r                     reset (clear) the query buffer
  \s [FILE]              display history or save it to file
  \w FILE                write query buffer to file

Input/Output
  \copy ...              perform SQL COPY with data stream to the client host
  \echo [-n] [STRING]    write string to standard output (-n for no newline)
  \i FILE                execute commands from file
  \ir FILE               as \i, but relative to location of current script
  \o [FILE]              send all query results to file or |pipe
  \qecho [-n] [STRING]   write string to \o output stream (-n for no newline)
  \warn [-n] [STRING]    write string to standard error (-n for no newline)

Conditional
  \if EXPR               begin conditional block
  \elif EXPR             alternative within current conditional block
  \else                  final alternative within current conditional block
  \endif                 end conditional block

Informational
  (options: S = show system objects, + = additional detail)
  \d[S+]                 list tables, views, and sequences
  \d[S+]  NAME           describe table, view, sequence, or index
  \da[S]  [PATTERN]      list aggregates
  \dA[+]  [PATTERN]      list access methods
  \dAc[+] [AMPTRN [TYPEPTRN]]  list operator classes
  \dAf[+] [AMPTRN [TYPEPTRN]]  list operator families
  \dAo[+] [AMPTRN [OPFPTRN]]   list operators of operator families
  \dAp[+] [AMPTRN [OPFPTRN]]   list support functions of operator families
  \db[+]  [PATTERN]      list tablespaces
  \dc[S+] [PATTERN]      list conversions
  \dconfig[+] [PATTERN]  list configuration parameters
  \dC[+]  [PATTERN]      list casts
  \dd[S]  [PATTERN]      show object descriptions not displayed elsewhere
  \dD[S+] [PATTERN]      list domains
  \ddp    [PATTERN]      list default privileges
  \dE[S+] [PATTERN]      list foreign tables
  \des[+] [PATTERN]      list foreign servers
  \det[+] [PATTERN]      list foreign tables
  \deu[+] [PATTERN]      list user mappings
  \dew[+] [PATTERN]      list foreign-data wrappers
  \df[anptw][S+] [FUNCPTRN [TYPEPTRN ...]]
                         list [only agg/normal/procedure/trigger/window] functions
  \dF[+]  [PATTERN]      list text search configurations
  \dFd[+] [PATTERN]      list text search dictionaries
  \dFp[+] [PATTERN]      list text search parsers
  \dFt[+] [PATTERN]      list text search templates
  \dg[S+] [PATTERN]      list roles
  \di[S+] [PATTERN]      list indexes
  \dl[+]                 list large objects, same as \lo_list
  \dL[S+] [PATTERN]      list procedural languages
  \dm[S+] [PATTERN]      list materialized views
  \dn[S+] [PATTERN]      list schemas
  \do[S+] [OPPTRN [TYPEPTRN [TYPEPTRN]]]
                         list operators
  \dO[S+] [PATTERN]      list collations
  \dp[S]  [PATTERN]      list table, view, and sequence access privileges
  \dP[itn+] [PATTERN]    list [only index/table] partitioned relations [n=nested]
  \drds [ROLEPTRN [DBPTRN]] list per-database role settings
  \drg[S] [PATTERN]      list role grants
  \dRp[+] [PATTERN]      list replication publications
  \dRs[+] [PATTERN]      list replication subscriptions
  \ds[S+] [PATTERN]      list sequences
  \dt[S+] [PATTERN]      list tables
  \dT[S+] [PATTERN]      list data types
  \du[S+] [PATTERN]      list roles
  \dv[S+] [PATTERN]      list views
  \dx[+]  [PATTERN]      list extensions
  \dX     [PATTERN]      list extended statistics
  \dy[+]  [PATTERN]      list event triggers
  \l[+]   [PATTERN]      list databases
  \sf[+]  FUNCNAME       show a function's definition
  \sv[+]  VIEWNAME       show a view's definition
  \z[S]   [PATTERN]      same as \dp

Large Objects
  \lo_export LOBOID FILE write large object to file
  \lo_import FILE [COMMENT]
                         read large object from file
  \lo_list[+]            list large objects
  \lo_unlink LOBOID      delete a large object

Formatting
  \a                     toggle between unaligned and aligned output mode
  \C [STRING]            set table title, or unset if none
  \f [STRING]            show or set field separator for unaligned query output
  \H                     toggle HTML output mode (currently off)
  \pset [NAME [VALUE]]   set table output option
                         (border|columns|csv_fieldsep|expanded|fieldsep|
                         fieldsep_zero|footer|format|linestyle|null|
                         numericlocale|pager|pager_min_lines|recordsep|
                         recordsep_zero|tableattr|title|tuples_only|
                         unicode_border_linestyle|unicode_column_linestyle|
                         unicode_header_linestyle)
  \t [on|off]            show only rows (currently off)
  \T [STRING]            set HTML <table> tag attributes, or unset if none
  \x [on|off|auto]       toggle expanded output (currently off)

Connection
  \c[onnect] {[DBNAME|- USER|- HOST|- PORT|-] | conninfo}
                         connect to new database (currently "mydb")
  \conninfo              display information about current connection
  \encoding [ENCODING]   show or set client encoding
  \password [USERNAME]   securely change the password for a user

Operating System
  \cd [DIR]              change the current working directory
  \getenv PSQLVAR ENVVAR fetch environment variable
  \setenv NAME [VALUE]   set or unset environment variable
  \timing [on|off]       toggle timing of commands (currently off)
  \! [COMMAND]           execute command in shell or start interactive shell

Variables
  \prompt [TEXT] NAME    prompt user to set internal variable
  \set [NAME [VALUE]]    set internal variable, or list all if no parameters
  \unset NAME            unset (delete) internal variable

mydb=# \h
Available help:
	ABORT
	ALTER AGGREGATE
	ALTER COLLATION
	ALTER CONVERSION
	ALTER DATABASE
	ALTER DEFAULT PRIVILEGES
	ALTER DOMAIN
	ALTER EVENT TRIGGER
	ALTER EXTENSION
	ALTER FOREIGN DATA WRAPPER
	ALTER FOREIGN TABLE
	ALTER FUNCTION
	ALTER GROUP
	ALTER INDEX
	ALTER LANGUAGE
	ALTER LARGE OBJECT
	ALTER MATERIALIZED VIEW
	ALTER OPERATOR
	ALTER OPERATOR CLASS
	ALTER OPERATOR FAMILY
	ALTER POLICY
	ALTER PROCEDURE
	ALTER PUBLICATION
	ALTER ROLE
	ALTER ROUTINE
	ALTER RULE
	ALTER SCHEMA
	ALTER SEQUENCE
	ALTER SERVER
	ALTER STATISTICS
	ALTER SUBSCRIPTION
	ALTER SYSTEM
	ALTER TABLE
	ALTER TABLESPACE
	ALTER TEXT SEARCH CONFIGURATION
	ALTER TEXT SEARCH DICTIONARY
	ALTER TEXT SEARCH PARSER
	ALTER TEXT SEARCH TEMPLATE
	ALTER TRIGGER
	ALTER TYPE
	ALTER USER
	ALTER USER MAPPING
	ALTER VIEW
	ANALYZE
	BEGIN
	CALL
	CHECKPOINT
	CLOSE
	CLUSTER
	COMMENT
	COMMIT
	COMMIT PREPARED
	COPY
	CREATE ACCESS METHOD
	CREATE AGGREGATE
	CREATE CAST
	CREATE COLLATION
	CREATE CONVERSION
	CREATE DATABASE
	CREATE DOMAIN
	CREATE EVENT TRIGGER
	CREATE EXTENSION
	CREATE FOREIGN DATA WRAPPER
	CREATE FOREIGN TABLE
	CREATE FUNCTION
	CREATE GROUP
	CREATE INDEX
	CREATE LANGUAGE
	CREATE MATERIALIZED VIEW
	CREATE OPERATOR
	CREATE OPERATOR CLASS
	CREATE OPERATOR FAMILY
	CREATE POLICY
	CREATE PROCEDURE
	CREATE PUBLICATION
	CREATE ROLE
	CREATE RULE
	CREATE SCHEMA
	CREATE SEQUENCE
	CREATE SERVER
	CREATE STATISTICS
	CREATE SUBSCRIPTION
	CREATE TABLE
	CREATE TABLE AS
	CREATE TABLESPACE
	CREATE TEXT SEARCH CONFIGURATION
	CREATE TEXT SEARCH DICTIONARY
	CREATE TEXT SEARCH PARSER
	CREATE TEXT SEARCH TEMPLATE
	CREATE TRANSFORM
	CREATE TRIGGER
	CREATE TYPE
	CREATE USER
	CREATE USER MAPPING
	CREATE VIEW
	DEALLOCATE
	DECLARE
	DELETE
	DISCARD
	DO
	DROP ACCESS METHOD
	DROP AGGREGATE
	DROP CAST
	DROP COLLATION
	DROP CONVERSION
	DROP DATABASE
	DROP DOMAIN
	DROP EVENT TRIGGER
	DROP EXTENSION
	DROP FOREIGN DATA WRAPPER
	DROP FOREIGN TABLE
	DROP FUNCTION
	DROP GROUP
	DROP INDEX
	DROP LANGUAGE
	DROP MATERIALIZED VIEW
	DROP OPERATOR
	DROP OPERATOR CLASS
	DROP OPERATOR FAMILY
	DROP OWNED
	DROP POLICY
	DROP PROCEDURE
	DROP PUBLICATION
	DROP ROLE
	DROP ROUTINE
	DROP RULE
	DROP SCHEMA
	DROP SEQUENCE
	DROP SERVER
	DROP STATISTICS
	DROP SUBSCRIPTION
	DROP TABLE
	DROP TABLESPACE
	DROP TEXT SEARCH CONFIGURATION
	DROP TEXT SEARCH DICTIONARY
	DROP TEXT SEARCH PARSER
	DROP TEXT SEARCH TEMPLATE
	DROP TRANSFORM
	DROP TRIGGER
	DROP TYPE
	DROP USER
	DROP USER MAPPING
	DROP VIEW
	END
	EXECUTE
	EXPLAIN
	FETCH
	GRANT
	IMPORT FOREIGN SCHEMA
	INSERT
	LISTEN
	LOAD
	LOCK
	MERGE
	MOVE
	NOTIFY
	PREPARE
	PREPARE TRANSACTION
	REASSIGN OWNED
	REFRESH MATERIALIZED VIEW
	REINDEX
	RELEASE SAVEPOINT
	RESET
	REVOKE
	ROLLBACK
	ROLLBACK PREPARED
	ROLLBACK TO SAVEPOINT
	SAVEPOINT
	SECURITY LABEL
	SELECT
	SELECT INTO
	SET
	SET CONSTRAINTS
	SET ROLE
	SET SESSION AUTHORIZATION
	SET TRANSACTION
	SHOW
	START TRANSACTION
	TABLE
	TRUNCATE
	UNLISTEN
	UPDATE
	VACUUM
	VALUES
	WITH
```
